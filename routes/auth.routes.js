const express = require("express");
const router = express.Router({ mergeParams: true });

const { authenticate, isLoggedIn } = require("../middleware/index");
const passport = require("passport");
const User = require("../models/user");
// const CLIENT_HOME_PAGE_URL = config.get("CLIENT_HOME_PAGE_URL") + "/";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/";

////// USE THE BELOW ROUTES FOR JWT-TOKEN AUTH

// router.post("/register", authController.register);
// router.post("/login", authController.login);
// router.get("/logout", authenticate, authController.logout);
// router.get("/user", authenticate, async (req, res) => {
//   return res.send(req.user);
// });

////// PASSPORT-JS OUTLOOK OAUTH ROUTES

router.get(
  "/auth/outlook",
  passport.authenticate("windowslive", {
    scope: [
      "openid",
      "profile",
      "offline_access",
      "https://outlook.office.com/Mail.Read",
    ],
  })
);

router.get(
  "/auth/outlook/callback",
  passport.authenticate("windowslive", {
    // successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/failed",
  }),
  function (req, res) {
    // Successful authentication
    res.redirect(CLIENT_HOME_PAGE_URL + "profile");
  }
);

router.get("/failed", (req, res) => {
  res.status(401).json({
    success: false,
    msg: "user authentication failed",
  });
});

router.get("/auth/logout", function (req, res) {
  req.session = null;
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
  // res.status(200).json({ msg: "Logged out successfully" });
});

////// USER INFO "PROTECTED" ROUTE

router.get("/user", isLoggedIn, (req, res) => {
  User.findById(req.user.id)
    .populate("enrolled_courses_id")
    .exec(function (err, foundUser) {
      if (err) {
        console.log(err);
        return res.status(404).json({ msg: err.message });
      }
      if (foundUser) {
        return res.status(200).json(foundUser);
      }
      return res.status(500).json({ msg: "someting wrong happened" });
    });
});

module.exports = router;
