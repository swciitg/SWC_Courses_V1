const express = require("express");
const router = express.Router({ mergeParams: true });

const passport = require("passport");
const { isLoggedIn } = require("../middlewares/auth");
const { CLIENT_HOME_PAGE_URL } = process.env;

router.get("/auth/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

router.get(
  "/auth/azureadoauth2/callback",
  passport.authenticate("azure_ad_oauth2", {
    failureRedirect: "/auth/failed",
  }),
  function (req, res) {
    //   // Successful authentication, redirect home.s
    //   console.log(req);
    // //   res.setHeader('Content-type','text/html');
    // //  return res.json(req);
    // console.log(req);

    return res.redirect(CLIENT_HOME_PAGE_URL);
  }
);
router.get("/", (req, res) => {

  // console.log(req);

  res.setHeader('Content-type', 'text/html');
  return res.send("<h1> Courses Page👍🏻</h1>");
});
// router.get("/courses",(req,res)=>{
//     res.setHeader('Content-type','text/html');
//     return res.send("<h1> hum second ✊🏼</h1>");
// });

router.get("/auth/failed", (req, res) => {
  return res.status(401).json({
    success: false,
    msg: "user authentication failed",
  });
});

router.get("/auth/logout", function (req, res) {
  req.session = null;
  req.logout();
  console.log("Logout route hit");
  return res.redirect(CLIENT_HOME_PAGE_URL + "/admin/");
  // res.status(200).json({ msg: "Logged out successfully" });
});

router.get("/current_user", isLoggedIn, (req, res) => {
  try {
    console.log(req.user.id);
    res.send(req.user);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;