const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const usercontroller = require("../controllers/user.controller")
const { CLIENT_HOME_PAGE_URL } = process.env;

router.get("/profs",usercontroller.getAllProfs);
router.get("/tas",usercontroller.getAllTAs);
  router.get("/prof/:id", usercontroller.getProf);
  router.post("/prof/post", usercontroller.postProf);
  router.put("/prof/:id", usercontroller.editProf);
  router.delete("/prof/:id", usercontroller.deleteProf);
  router.get("/ta/:id",usercontroller.getTA);
  router.post("/ta/post",usercontroller.postTA);
  router.put("/ta/:id",usercontroller.editTA);
  router.delete("/ta/:id",usercontroller.deleteTA);

module.exports = router;
