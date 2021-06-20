const express = require('express');
const router = express.Router({ mergeParams: true });

const courseController = require('../controllers/course.controller')
const {isLoggedIn, IsAdmin} = require('../middlewares/auth')


//get all courses 
router.get('/courses', courseController.getAllCourses);

//search courses
router.get('/courses/search', courseController.searchCourse)

//get one course
router.get('/courses/:id', courseController.getOneCourse)

//course enrollment
router.post('/courses/:id/enrol', isLoggedIn, courseController.enrollInCourse)

//new course
router.post("/courses/postcourse", isLoggedIn ,courseController.postCourse)

module.exports = router