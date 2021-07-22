const express = require("express");
const app = express();
const path=require("path");
const router = express.Router({ mergeParams: true });

const passport = require("passport");
const { isLoggedIn } = require("../middlewares/auth");
const { CLIENT_HOME_PAGE_URL } = process.env;

router.get("/auth/azureadoauth2", passport.authenticate("microsoft"));

router.get(
  "/auth/azureadoauth2/callback",
  passport.authenticate("microsoft", {
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

router.get("/current_user", (req, res) => {
  try {
  
    if(req.user){
      console.log(req.user.name);
      return res.send(req.user);
    }
    else{
      res.status(401).json({status : false, err : "Sign in First!!!"})
    }
  } catch (error) {
    console.log(error.message);
  }
});

// router.get("/GD",isLoggedIn,(req,res)=>{
//   try{
//     return res.sendFile(path.join(__dirname,"../index.html"));

//   } catch(error){
//     console.log(error.message);
//   }
// });

module.exports = router;