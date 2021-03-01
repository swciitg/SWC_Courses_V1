let express = require("express");
let router = express.Router();
// let adminController = require("../controllers/admin.controller");
let adminController = require("../controllers/admin.controller2");
let User = require("../models/user");

router.use("/", adminController.isAdminController);

//home page route for admin
router.get("/", function (req, res) {
  res.render("./admin/home");
});

//view all courses
router.get("/courses", adminController.getAllCourses);

//logic to handel adding new course
router.post(
  "/courses",
  adminController.thumbnailImageUpload,
  adminController.addCourse
);

//view a specifc course
router.get("/courses/:id", adminController.getOneCourse);

//add a new video to the course
//form to add a new video
//router.get("/courses/:id/video/add", adminController.getOneCourse);

// route for edit course form
// router.get("/courses/:id/edit", adminController.getOneCourse);

//add video
router.post("/courses/:id/videos", adminController.uploadVideo);

//add full course via torrent
/*router.post(
  "/torrentUpload",
  adminController.thumbnailImageUpload,
  adminController.downloadAllTorrentFiles
);*/

//this is for testing the new admin

router.post(
  "/torrentUpload",
  adminController.thumbnailImageUpload,
  adminController.downloadAllTorrentFiles
);

/* ############## GIVE OR DELETE ADMIN ACCESS ################# */

//1. MAKE SOMEONE ADMIN
router.post("/createAdmin", adminController.createAdminController);

//2. REMOVE SOMEONE FROM ADMIN
router.post("/deleteAdmin", adminController.deleteAdminController);

/* ############## //GIVE OR DELETE ADMIN ACCESS ################# */

//update course
router.put("/courses/:id", adminController.updateOneCourse);

//route for deleting course
router.delete("/courses/:id", adminController.deleteOneCourse);

//view all users
router.get("/users", async (req, res, next) => {
  try {
    let users = await User.find();
    if (users.length) {
      res.send(users);
    } else {
      error = {
        status: 400,
        message: "No users found",
      };
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

//edit user permissions
//route for edit user form
router.get("/users/:id/edit", function (req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    res.render("./admin/users/edit", { user: foundUser });
  });
});
//update user permissions
router.put("/users/:id", function (req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body.user,
    function (err, updatedUser) {
      if (err) {
        res.redirect("/");
      } else {
        res.redirect("/admin/users");
      }
    }
  );
});

module.exports = router;
