const express = require("express");
const router = express.Router({ mergeParams: true });

const passport = require("passport");
const { isLoggedIn } = require("../middlewares/auth");
const Prof = require("../models/Prof");
const TA = require("../models/TA");
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
router.get("/",(req,res)=>{

    // console.log(req);

    res.setHeader('Content-type','text/html');
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

  router.get("/Prof",isLoggedIn,(req,res)=>{

    const Prof = new Prof({
      email:req.user.email
    })
    Prof.save()
      .then((result)=>{
        res.send(result);
      })
      .catch((err)=>{
        console.log(err);
      })
  });
  
    router.post("/Prof",isLoggedIn,(req,res)=>{
      if(req.user.email){
        const id = req.params.id;
        Prof.save({_id:id});
      }
      else
      const Prof = new Prof(req.body);
      Prof.save()
        .then((result)=>{
          res.redirect("/");
        })
        .catch((err)=>{
          console.log(err);
        })
    });
  
    router.delete("/Prof/delete",isLoggedIn,(req,res)=>{
      const id = req.params.id;
      Prof.findByIdAndDelete(id)
        .then((result)=>{
          res.json({redirect: "/"});
        })
        .catch((err)=>{
          console.log(err);
        })
    });
  
    router.get("/Prof/edit",isloggedIn,async(req,res)=>{
      try{
        const id = req.params.id;
        const Prof = await Prof.findById(id);
        res.render(" ",{Prof:req.email});    
      }
      catch(error){
        console.log(error.message);
      }
    })
  
    
  
    router.get("/TA",isLoggedIn,(req,res)=>{
  
      const TA= new TA({
        email:req.user.email
      })
      TA.save()
        .then((result)=>{
          res.send(result);
        })
        .catch((err)=>{
          console.log(err);
        })
    });
    //Post request
      router.post("/TA",isLoggedIn,(req,res)=>{
        if(req.user.email){
          const id = req.params.id;
          TA.save({_id:id});
        }
        else
        const TA = new TA(req.body);
        TA.save()
          .then((result)=>{
            res.redirect("/");
          })
          .catch((err)=>{
            console.log(err);
          })
      });
    
    
      router.delete("/TA/delete",isLoggedIn,(req,res)=>{
        const id = req.params.id;
        TA.findByIdAndDelete(id)
          .then((result)=>{
            res.json({redirect: "/"});
          })
          .catch((err)=>{
            console.log(err);
          })
      });
    
      router.get("/TA/edit",isloggedIn,async(req,res)=>{
        try{
          const id = req.params.id;
          const TA = await TA.findById(id);
          res.render(" ",{TA:req.email});
          
        }
        catch(error){
          console.log(error.message);
        }
    
      })

module.exports = router;