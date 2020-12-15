let Course = require("../models/course");
let Media = require("../models/media");
let User = require("../models/user");
let fs = require("fs");
let dirname = require("../dirname");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffprobe = require("ffprobe-static");
const multer = require("multer");
let pathToFfmpeg = require("ffmpeg-static");
const { getVideoDurationInSeconds } = require("get-video-duration");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = dirname.dirpath + "/assets/videos";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage }).fields([{ name: "video" }]);

ffmpeg.setFfmpegPath(pathToFfmpeg);
ffmpeg.setFfprobePath(ffprobe.path);

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
  //data from form
  try {
    const { title, author, description } = req.body;

    const newCourse = new Course({ title, author, description });
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

    const deleteVideos = async (_) => {
      for (const i = 0; i < len; i++) {
        video = foundVideos[i];
        path = "assets" + video.filePath;
        deletePath = path.substring(0, path.length - 9);
        fs.rmdirSync(deletePath, { recursive: true }, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    };

    deleteVideos().then(async (_) => {
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
  upload(req, res, (err) => {
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
    try {
      const targetdirInfo = fs.statSync(targetdir);
    } catch (err) {
      if (err.code === "ENOENT") {
        fs.mkdirSync(targetdir);
      } else {
        throw err;
      }
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
                fs.unlinkSync(
                  "assets/videos/" + req.files.video[0].originalname,
                  function (err) {
                    if (err) {
                      console.log(err);
                    }
                    console.log("raw file deleted and mpd file created");
                  }
                );

                return res.status(200).json(newlyCreated);
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
