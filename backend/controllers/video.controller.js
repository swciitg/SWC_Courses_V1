const Media = require('../models/media');
const multer = require('multer');
const fs = require('fs');
const dirname = require('../dirname');
const path = require('path');
const Bull=require('bull');
const encodingProcess=require('./encodingProcess');

const videoQueue= new Bull('video',{
    redis:process.env.REDIS_URL
});

videoQueue.process(encodingProcess.encodeVideo);

// To get all the info about all the videos of a particlular course
const videoInfo = (req, res, next) => {
    Media.find({course : req.params.course_id})
        .then(media =>{
            return res.status(200).json({media});
        })
        .catch(err =>{
            return res.status(500).json({error : err.message});
        });
};

// Multer storage object
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        let dir = path.join(dirname.dirpath, '/assets/videos');
        cb(null, dir);
    },
    filename : function (req, file, cb ){
        cb(null, file.originalname);
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
            { name: "video", maxCount : 5}
         ]);


exports.uploadVideo = (req, res, next) => {
    upload(req,res, async(err) =>{
        let fileName = 
            req.files.video[0].originalname.split('.').slice(0,-1).join('.') + "-" + Date.now() + path.extname(req.files.video[0].originalname); 
        
        if(err){
            res.status(500).json({ error: err.message });
        }
        
        let filename = 
            req.files.video[0].originalname.split('.').slice(0,-1).join('.') + "-" + Date.now() + path.extname(req.files.video[0].originalname);
        videoQueue.add({video:`../assets/video/${filename}`,filename},{
            attempts: 3,
            removeOnFail:true

        });
        res.status(200).json({ message : "success fully uploaded"});
    });

}
