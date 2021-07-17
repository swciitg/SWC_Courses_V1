const express = require('express');
const router = express.Router({ mergeParams: true });

const videoController = require('../controllers/video.controller');
const auth = require('../middlewares/auth'); 

// Get details of all the course videos in an array
router.get('/:course_id',auth.isLoggedIn, videoController.videoInfo);

// Upload a video (admin only)
router.post('/:course_id', videoController.uploadVideo);

// Get the thumbnail of a video 
router.get('/thumbnail/:video_id',auth.isLoggedIn, videoController.getThumbnail);

// Get a video 
router.get('/:video_id', auth.isLoggedIn, videoController.getVideo);

// Delete video (admin only)
//router.delete('/:video_id', auth.isAdmin, videoController.deleteVideo);

module.exports = router;