const user = require("../models/user");
const Prof = require("../models/Prof");
const TA = require("../models/TA");
//const { propfind } = require("../routes/auth.routes");
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      if(req.user.email == Prof.find(email) ){
        user.role = "Prof";
        
      }
      else if(req.user.email == TA.find(email)){
        user.role = "TA";
      }
      next();
    } else {
      return res
        .status(401)
        .json({
          status: "Not authenticated",
          msg: "You are not authenticated !",
        });
    }
  };

  const isAdmin=(req, res, next)=> {
    console.log("asd");
    if (req.user.isAdmin) {
      return next();
    }
    else {
      return res
        .status(401)
        .json({
          status: "Not authorized",
          msg: "You are not authorized !",
        });
    }
  };
  
  module.exports = { isLoggedIn, isAdmin };