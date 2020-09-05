let express = require("express");
let router = express.Router();
let uploadController = require('../controllers/upload.controller');

//multer config

router.post("/courses/:id", isAdmin, uploadController.uploadVideo);
//middleware
function isAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    }
  }
  res.redirect("/");
}

module.exports = router;
