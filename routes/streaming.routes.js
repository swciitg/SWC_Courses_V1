const express = require("express");
const router = express.Router({ mergeParams: true });
const streamingController = require("../controllers/streaming.controller");
const { isLoggedIn } = require("../middleware/index");

router.get("/video/:video_id", isLoggedIn, streamingController.getVideo);
router.patch("/video/:video_id", isLoggedIn, streamingController.updateVideo);

router.post("/video/:video_id/bookmark/", streamingController.addBookmark);

router.delete(
  "/video/:video_id/bookmark/:book_id/",
  streamingController.deleteBookmark
);

module.exports = router;

