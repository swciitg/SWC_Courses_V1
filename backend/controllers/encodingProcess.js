let Course = require("../models/course");
let Media = require("../models/media");
let User = require("../models/user");
const fs = require("fs");
const dirname = require('../dirname');
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffprobe = require("ffprobe-static");
let pathToFfmpeg = require("ffmpeg-static");
const { getVideoDurationInSeconds } = require("get-video-duration");
const { dir } = require("console");
const { exec } = require("child_process");
const { title } = require("process");
const { resolve } = require("path");

exports.encodeVideo=async(job, done)=>{
    const targetdir = path.join(dirname.dirpath, "/assets/mpd/", job.data.filename);

    const sourcefn = path.join(
      dirname.dirpath,
      "/assets/videos/",
      job.data.filename
    );

    console.log("source:", sourcefn);
    console.log("target:", targetdir);
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
              filePath: "/mpd/" + job.data.filename + "/dash.mpd",
              thumbnail: "/mpd/" + job.data.filename + "/thumbnail.png",
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
                  "assets/videos/" + job.data.filename,
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


done();
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