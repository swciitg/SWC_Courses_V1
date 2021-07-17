const Media = require('../models/media');
const Course = require('../models/course');
const multer = require('multer');
const fs = require('fs');
const dirname = require('../dirname');
const path = require('path');
const Bull = require('bull');
const encodingProcess = require('./encodingProcess');

const videoQueue = new Bull('video', {
    redis: process.env.REDIS_URL
});

videoQueue.process(encodingProcess.encodeVideo);

// To get all the info about all the videos of a particlular course
exports.videoInfo = (req, res, next) => {
    Media.find({ course: req.params.course_id })
        .populate("course")
        .then(media => {
            return res.status(200).json({ videoinfo : media });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

// Multer storage object
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = path.join(dirname.dirpath, '/assets/courserecordings');
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        let fileName =
            file.originalname.split('.').slice(0, -1).join('.') + "-" + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});


//init multer with max video upload limit 5 at a time
let upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        // upload only mp4 and mkv format
        if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
            return cb(new Error('Please upload a video'));
        }
        cb(undefined, true);
    }
})
    .fields([
        { name: "video", maxCount: 5 }
    ]
    );


exports.uploadVideo = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
            return;
        }
        // console.log(req.files);
        for (let i = 0; i < req.files.video.length; i++) {
            let filename = req.files.video[i].filename;
            console.log(filename);
            videoQueue.add({ video: `../assets/courserecordings/${filename}`, filename }, {
                attempts: 3,
                removeOnFail: true

            });
        }
        res.status(200).json({ message: "success fully uploaded" });
    });
}

exports.getVideo = async (req, res, next) => {
    Media.findOne({ _id: req.params.video_id })
        .populate("course")
        .then(media => {
            return res.status(200).json({ video : media });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

exports.getThumbnail = (req, res, next) => {
    Media.findOne({ _id: req.params.video_id })
        .then(media => {
            return res.status(200).json({ thumbnail : media.thumbnail });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};