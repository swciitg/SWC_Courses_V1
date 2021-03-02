let Course = require("../models/course");
let Media = require("../models/media");
let User = require("../models/user");
const fs = require("fs");
let dirname = require("../dirname");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffprobe = require("ffprobe-static");
const multer = require("multer");
let pathToFfmpeg = require("ffmpeg-static");
const { getVideoDurationInSeconds } = require("get-video-duration");
let WebTorrent = require("webtorrent-hybrid/index");
const { dir } = require("console");
const { exec } = require("child_process");
const { title } = require("process");
const { resolve } = require("path");
const course = require("../models/course");

ffmpeg.setFfmpegPath(pathToFfmpeg);
ffmpeg.setFfprobePath(ffprobe.path);
//multer code
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = dirname.dirpath + "/assets/videos";
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage }).fields([{ name: "video" }]);

// Set The Storage Engine
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir2 = dirname.dirpath + "/assets/thumbnails";
    cb(null, dir2);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload2 = multer({
  storage: storage2,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

exports.getAllCourses = async (req, res) => {
  //get courses from db
  try {
    let courses = await Course.find();
    return res.json({ courses: courses });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

exports.addCourse = async (req, res) => {
  let imgPath = "";
  if (req.file) {
    imgPath =
      "/thumbnails/" +
      req.file.fieldname +
      "-" +
      Date.now() +
      path.extname(req.file.originalname);
  }
  //data from form
  try {
    const { title, author, description } = req.body;

    const newCourse = new Course({ title, author, description, imgPath });
    await newCourse.save();

    return res.status(200).json({
      course: { newCourse },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

exports.getOneCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    return res.status(200).json({ course: course });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

exports.updateOneCourse = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const update = { title, author, description };
    let updatedCourse = await Course.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    return res.status(200).json({ course: updatedCourse });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

exports.deleteOneCourse = async (req, res) => {
  try {
    const foundVideos = await Media.find({ course: req.params.id });
    const len = foundVideos.length;

    const deleteVideos = async () => {
      for (let i = 0; i < len; i++) {
        let video = foundVideos[i];
        let path = "assets" + video.filePath;
        let deletePath = path.substring(0, path.length - 9);
        //it will delete all empty directories but assets directory will always have atleast one md file

        fs.rmdir(deletePath, { recursive: true }, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    };

    deleteVideos().then(async () => {
      await Media.deleteMany({ course: req.params.id });

      await Course.findByIdAndDelete(req.params.id);

      return res.status(200).json({ msg: "Course Removed" });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
};

exports.uploadVideo = (req, res) => {
  // res.status(200).json({
  //   msg:
  //     "Video is uploaded on server and is under processing check logs for more details",
  // });

  upload(req, res, async (err) => {
    const sizes = [
      [240, 350],
      [480, 700],
      [720, 2500],
    ];

    console.log(req.files.video[0].originalname);

    let fileName =
      req.files.video[0].originalname.split(".").slice(0, -1).join(".") +
      "-" +
      Date.now();
    fileName = fileName.replace(/\s+/g, "");
    const fn = req.files.video[0].originalname;
    const name = path.basename(fn, path.extname(fn));
    const targetdir = path.join(dirname.dirpath, "/assets/mpd/", fileName);

    const sourcefn = path.join(
      dirname.dirpath,
      "/assets/videos/",
      req.files.video[0].originalname
    );

    console.log("source:", sourcefn);
    console.log("target:", targetdir);
    console.log("name:", name);
    console.log("fn:", fn);
    // try {
    //   const targetdirInfo = fs.statSync(targetdir);
    // } catch (err) {
    //   if (err.code === "ENOENT") {
    //     fs.mkdirSync(targetdir);
    //   } else {
    //     throw err;
    //   }
    // }

    try {
      let targetdirInfo = await checkDirectoryPro(targetdir);
      console.log(encoddirmsg);
    } catch (err) {
      console.log(err);
    }

    const proc = ffmpeg({
      source: sourcefn,
      cwd: targetdir,
    });

    const targetfn = path.join(targetdir, `dash.mpd`);

    proc
      .output(targetfn)
      .format("dash")
      .videoCodec("libx264")
      .audioCodec("aac")
      .audioChannels(2)
      .audioFrequency(44100)
      .outputOptions([
        "-preset veryfast",
        "-keyint_min 60",
        "-g 60",
        "-sc_threshold 0",
        "-profile:v main",
        "-use_template 1",
        "-use_timeline 1",
        "-b_strategy 0",
        "-bf 1",
        "-map 0:a",
        "-b:a 96k",
      ]);

    for (let size of sizes) {
      let index = sizes.indexOf(size);

      proc.outputOptions([
        `-filter_complex [0]format=pix_fmts=yuv420p[temp${index}];[temp${index}]scale=-2:${size[0]}[A${index}]`,
        `-map [A${index}]:v`,
        `-b:v:${index} ${size[1]}k`,
      ]);
    }

    proc.on("start", function (commandLine) {
      console.log("progress", "Spawned Ffmpeg with command: " + commandLine);
    });

    proc
      .on("progress", function (info) {
        console.log("progress", info);
      })
      .on("end", function () {
        getVideoDurationInSeconds(sourcefn).then((duration) => {
          Course.findById(req.params.id, function (err, foundCourse) {
            if (err) throw err;

            let media = {
              title: req.body.title,
              filePath: "/mpd/" + fileName + "/dash.mpd",
              thumbnail: "/mpd/" + fileName + "/thumbnail.png",
              duration: duration,
            };

            Media.create(media, async (err, newlyCreated) => {
              if (err) {
                console.log(err);
              } else {
                //add course id to media
                newlyCreated.course = req.params.id;
                //save media
                await newlyCreated.save();
                foundCourse.videos.push(newlyCreated);
                await foundCourse.save();
                //console.log(newlyCreated);
                fs.unlink(
                  "assets/videos/" + req.files.video[0].originalname,
                  function (err) {
                    if (err) {
                      console.log(err);
                    }
                    console.log("raw file deleted and mpd file created");
                  }
                );
                return res.status(200).json(newlyCreated);
                //    return console.log("Newly created media -\n", newlyCreated);
              }
            });
          });
        });
      })
      .on("error", function (err) {
        console.log("error", err);
      });

    proc.run();

    const imageProc = ffmpeg({
      source: sourcefn,
      cwd: targetdir,
    });
    imageProc
      .output("thumbnail.png")
      .screenshots({
        count: 1,
        folder: targetdir,
      })
      .on("end", function () {
        console.log("Screenshots taken");
      })
      .on("error", function (err) {
        console.error(err);
      });

    imageProc.run();
  });
};

const createDirectoryPro = (directory) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        console.log("error is happend in creation of directory");
        reject("could not make directory");
      }
      resolve("successfully created directory");
    });
  });
};

const checkDirectoryPro = (directory) => {
  return new Promise((resolve, reject) => {
    fs.access(directory, async (err) => {
      if (err) {
        console.log("creating directory because directory is not exist");
        //directory doesn't exist so create it and then start downloading
        try {
          let dirmsg = await createDirectoryPro(directory);
          resolve(dirmsg);
        } catch (err) {
          console.log(err);
        }
      }
      resolve("dir success");
    });
  });
};

const torrentDownloadPro = (file, length, courseId) => {
  return new Promise((resolve, reject) => {
    const source = file.createReadStream();
    const destination = fs.createWriteStream(
      path.join(dirname.dirpath, "/assets/videos/", file.path)
    );

    destination.on("open", () => {
      source
        .on("end", async () => {
          console.log("file:\t\t", file.name, " downloaded");
          // destroy torrent after all files are saved
          //  length -= 1;
          console.log("download remining = " + length);
          if (!length) {
            videoTorrent.destroy(() => {
              console.log("torrent is successfully destroyed");
            });
          }
          //now start encoding
          try {
            let fileName =
              file.name.split(".").slice(0, -1).join(".") + "-" + Date.now();
            fileName = fileName.replace(/\s+/g, "_"); //to replace space with _
            const targetdir = path.join(
              dirname.dirpath,
              "/assets/mpd/",
              file.path.replace(file.name, "") + fileName
            );
            let encoddirmsg = await checkDirectoryPro(targetdir);
            console.log(encoddirmsg);
            await encodeFfmpegTorrentPro(file, courseId, targetdir, fileName);
            resolve(`Video  is encoded successfully, raw file deleted`);
            console.log(
              `Video ${
                this.current + 1
              } is encoded successfully, raw file deleted`
            );
          } catch (err) {
            reject(err);
            console.log(err);
          }
        })
        .pipe(destination);
    });
  });
};

const encodeFfmpegTorrentPro = (file, courseId, targetdir, fileName) => {
  return new Promise((resolve, reject) => {
    const videoIndex = file.name.split(".")[0];
    console.log("file path - ", file.path);
    console.log("file path stringified - ", JSON.stringify(file.path));
    const sectionIndex = JSON.stringify(file.path).split("/")[2].split(".")[0];

    try {
      const sizes = [
        [240, 350],
        [480, 700],
        [720, 2500],
      ];

      const fn = file.name;
      const name = path.basename(fn, path.extname(fn));

      const sourcefn = path.join(dirname.dirpath, "/assets/videos/", file.path);

      console.log("source:", sourcefn);
      console.log("target:", targetdir);
      console.log("name:", name);
      console.log("fn:", fn);
      // try {
      //   const targetdirInfo = fs.statSync(targetdir);
      // } catch (err) {
      //   if (err.code === "ENOENT") {
      //     fs.mkdirSync(targetdir);
      //   } else {
      //     throw err;
      //   }
      // }

      const proc = ffmpeg({
        source: sourcefn,
        cwd: targetdir,
      });

      const targetfn = path.join(targetdir, `dash.mpd`);

      proc
        .output(targetfn)
        .format("dash")
        .videoCodec("libx264")
        .audioCodec("aac")
        .audioChannels(2)
        .audioFrequency(44100)
        .outputOptions([
          "-preset veryfast",
          "-keyint_min 60",
          "-g 60",
          "-sc_threshold 0",
          "-profile:v main",
          "-use_template 1",
          "-use_timeline 1",
          "-b_strategy 0",
          "-bf 1",
          "-map 0:a",
          "-b:a 96k",
        ]);

      for (let size of sizes) {
        let index = sizes.indexOf(size);

        proc.outputOptions([
          `-filter_complex [0]format=pix_fmts=yuv420p[temp${index}];[temp${index}]scale=-2:${size[0]}[A${index}]`,
          `-map [A${index}]:v`,
          `-b:v:${index} ${size[1]}k`,
        ]);
      }

      proc.on("start", function (commandLine) {
        console.log("progress", "Spawned Ffmpeg with command: " + commandLine);
      });

      proc
        .on("progress", function (info) {
          console.log("progress", info);
        })
        .on("end", function () {
          getVideoDurationInSeconds(sourcefn).then((duration) => {
            Course.findById(courseId, function (err, foundCourse) {
              if (err) {
                reject(err);
                console.log(err);
              }

              let media = {
                title: file.name.split(".").slice(0, -1).join("."),
                filePath:
                  "/mpd/" +
                  file.path.replace(file.name, "") +
                  fileName +
                  "/dash.mpd",
                thumbnail:
                  "/mpd/" +
                  file.path.replace(file.name, "") +
                  fileName +
                  "/thumbnail.png",
                duration: duration,
                index: { videoIndex, sectionIndex },
              };

              Media.create(media, async (err, newlyCreated) => {
                if (err) {
                  reject(err);
                  console.log(err);
                } else {
                  console.log("Media creating in db");
                  //add course id to media
                  newlyCreated.course = courseId;
                  //save media
                  try {
                    await newlyCreated.save();
                    foundCourse.videos.push(newlyCreated);
                    await foundCourse.save();
                    console.log("Media created successfully");
                  } catch (err) {
                    reject(err);
                    console.log(err);
                  }
                  //console.log(newlyCreated);
                  fs.unlink(sourcefn, function (err) {
                    if (err) {
                      console.log(err);
                    }
                    resolve("rew file deleted and mpd file created");
                    console.log("raw file deleted and mpd file created");
                  });

                  // return res.status(200).json(newlyCreated);
                }
              });
            });
          });
        })
        .on("error", function (err) {
          reject(err);
          console.log("error", err);
        });

      proc.run();

      const imageProc = ffmpeg({
        source: sourcefn,
        cwd: targetdir,
      });
      imageProc
        .output("thumbnail.png")
        .screenshots({
          count: 1,
          folder: targetdir,
        })
        .on("end", function () {
          console.log("Screenshots taken");
        })
        .on("error", function (err) {
          console.error(err);
        });

      imageProc.run();
    } catch (err) {
      console.log(err);
    }
  });
};
exports.thumbnailImageUpload = async (req, res, next) => {
  //thumbnail image for the course, download implementation using multur
  upload2(req, res, (err) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(req.file);
      if (req.file) {
        console.log("thumbnail is uploaded successfully");
        return next();
      } else {
        console.log("something went wrong when uploading the file");
        return next();
      }
    }
  });
};
exports.downloadAllTorrentFiles = async (req, res) => {
  let imgPath = "";
  if (req.file) {
    imgPath =
      "/thumbnails/" +
      req.file.fieldname +
      "-" +
      Date.now() +
      path.extname(req.file.originalname);
  }

  //create course in db
  //data from form
  let courseId;

  const { title, author, description } = req.body;

  const newCourse = new Course({ title, author, description, imgPath });
  try {
    await newCourse.save();
  } catch (error) {
    console.log(error);
    return res.status(409).json({
      msg: "This course is already exist",
    });
  }
  courseId = newCourse._id;
  console.log("course is successfully create in db", courseId);
  res.status(200).json({
    msg: "Torrent is added successsfully now check terminal for more updates.",
  });

  //start the downloading and encoding procedure
  const client = new WebTorrent();
  const torrentUrl = req.body.magnet;

  const videoTorrent = client.add(
    torrentUrl,
    {
      announce: ["wss://tracker.openwebtorrent.com"],
    },
    (torrent) => {
      console.log("torrent added successfully");
      torrent.deselect(0, torrent.pieces.length - 1, false);
    }
  );
  // Stream each file to the disk
  videoTorrent.on("ready", async () => {
    const files = videoTorrent.files;
    let length = files.length;
    let range = {
      from: 0,
      to: files.length,
      files: files,

      [Symbol.asyncIterator]() {
        return {
          current: this.from,
          last: this.to,
          // last: 8,
          files: this.files,

          async next() {
            let file = this.files[this.current];
            length -= 1;

            if (file.name.endsWith(".mp4") || file.name.endsWith(".mkv")) {
              let directory = path.join(
                dirname.dirpath,
                "/assets/videos/",
                file.path.replace(file.name, "")
              );

              let dirmsg = await checkDirectoryPro(directory);

              console.log({ msg: dirmsg, videoNO: this.current - 1 });

              let torrentmsg = await torrentDownloadPro(file, length, courseId);
              console.log("message from torrent - ", torrentmsg);
            }

            if (this.current < this.last - 1) {
              return { done: false, value: this.current++ };
            } else {
              return { done: true };
            }
          },
        };
      },
    };

    for await (let value of range) {
      // (4)
      console.log("I'm from for await loop - ", value);
    }
  });

  videoTorrent.on("error", (err) => {
    if (err) {
      console.log("torrent error-");
      console.log(err);
    }
  });
};
exports.isAdminController = async (req, res, next) => {
  if (req.user) {
    const email = req.user.email;

    const user = await User.findOne({ email });

    if (user.isAdmin) {
      return next();
    }
    return res.status(401).json({ msg: "Only admin has access to this route" });
  }
  return res.status(401).json({ msg: "Please Login" });
};
exports.createAdminController = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      data: {
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.deleteAdminController = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: false },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      data: {
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};
