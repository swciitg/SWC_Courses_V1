const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const usercontroller = require("../controllers/user.controller")
const { CLIENT_HOME_PAGE_URL } = process.env;


  router.get("/:id", usercontroller.getProf);
  router.post("/", usercontroller.postProf);
  router.put("/:id", usercontroller.editProf);
  router.delete("/:id", usercontroller.deleteProf);
  router.get("/:id",usercontroller.getTA);
  router.post("/",usercontroller.postTA);
  router.put("/:id",usercontroller.editTA);
  router.delete("/:id",usercontroller.deleteTA);

module.exports = router;
