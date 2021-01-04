const express = require("express");
const router = express.Router({ mergeParams: true });
const streamingController = require("../controllers/streaming.controller");
const { isLoggedIn } = require("../middleware/index");
const passport = require("passport");

router.get("/video/:video_id", isLoggedIn, streamingController.getVideo);
router.patch("/video/:video_id", isLoggedIn, streamingController.updateVideo);

router.post(
  "/video/:video_id/bookmark/",
  isLoggedIn,
  streamingController.addBookmark
);

router.delete(
  "/video/:video_id/bookmark/:book_id/",
  isLoggedIn,
  streamingController.deleteBookmark
);

module.exports = router;
