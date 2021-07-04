const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const usercontroller = require("../controllers/user.controller");
const { CLIENT_HOME_PAGE_URL } = process.env;

router.get("/coursestaken/:id",usercontroller.getAllCoursesTaken);

router.get("/coursesteach/:id",usercontroller.getAllCoursesTeach);

module.exports = router;