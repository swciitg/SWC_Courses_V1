const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth2.controller");
const { authenticate, isLoggedIn } = require("../middleware/index");
const passport = require("passport");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.send("<h1>WELCOME TO SWC-COURSES</h1>");
});

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
  passport.authenticate("windowslive", { failureRedirect: "/courses" }),
  function (req, res) {
    // Successful authentication
    res.status(200).json({ msg: "Logged in successfully" });
  }
);

router.get("/logout", function (req, res) {
  req.session = null;
  req.logout();
  res.status(200).json({ msg: "Logged out successfully" });
});

////// USER INFO "PROTECTED" ROUTE

router.get("/user", isLoggedIn, (req, res) => {
  User.findById(req.user.id, (err, foundUser) => {
    if (err) {
      console.log(err);
    }
    if (foundUser) {
      console.log("The found user is", foundUser);
      res.status(200).json(foundUser);
    }
  });
});

module.exports = router;
