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
    
console.log(job.data);
done();
};
