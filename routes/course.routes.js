const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/index')
const courseController = require('../controllers/course.controller');

//list all courses
router.get('/courses', courseController.getAllCourses);

//search implementation
router.get("/courses/search", courseController.searchCourse)


//course page
router.get('/courses/:id', courseController.getOneCourse);

//course enrol
router.get('/courses/:id/enrol', courseController.enrollInCourse);


module.exports = router;
