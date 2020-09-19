const express = require("express");
const router = express.Router({ mergeParams: true });
const streamingController = require('../controllers/streaming.controller');


router.get("/video/:video_id", streamingController.getVideo);

router.post("/video/:video_id/bookmark/", streamingController.addBookmark);

router.delete('/video/:video_id/bookmark/:book_id/', streamingController.deleteBookmark)

module.exports = router;
