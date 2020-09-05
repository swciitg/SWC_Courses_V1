let express = require('express');
let router = express.Router();
let Course = require("../models/course");


const courseController = require('../controllers/course.controller');

//list all courses
router.get('/courses', courseController.getAllCourses);

//search implementation
router.get("/courses/search", function (req, res) {
  Course.find({ $or: [{ author: { '$regex': req.query.dsearch, '$options': 'i' } }, { title: { '$regex': req.query.dsearch, '$options': 'i' } }, { topics: { '$regex': req.query.dsearch, '$options': 'i' } }] }, function (err, foundCourses) {
    if (err) {
      console.log(err);
      return res.redirect('back')
    }
    res.render('search', { foundCourses: foundCourses })
  })
})


//course page
router.get('/courses/:id', courseController.getOneCourse);

//course enrol
router.get('/courses/:id/enrol', courseController.enrollInCourse);


module.exports = router
