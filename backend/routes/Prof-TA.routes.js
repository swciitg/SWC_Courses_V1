const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const Profcontroller = require("../controllers/Prof.controller");
const { CLIENT_HOME_PAGE_URL } = process.env;

router.get("/profs",Profcontroller.getAllProfs);

router.get("/tas",Profcontroller.getAllTAs);

  router.get("/prof/:id", Profcontroller.getProf);

  router.post("/prof/post", Profcontroller.postProf);

  router.put("/prof/:id", Profcontroller.editProf);

  router.delete("/prof/:id", Profcontroller.deleteProf);

  router.get("/ta/:id",Profcontroller.getTA);

  router.post("/ta/post",Profcontroller.postTA);

  router.put("/ta/:id",Profcontroller.editTA);

  router.delete("/ta/:id",Profcontroller.deleteTA);

module.exports = router;
