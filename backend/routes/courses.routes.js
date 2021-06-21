const express = require('express');
const router = express.Router({ mergeParams: true });

const courseController = require('../controllers/course.controller')
const { isLoggedIn, IsAdmin } = require('../middlewares/auth')


//Courses Routes

//get all courses 
router.get('/courses', courseController.getAllCourses);

//search courses
router.get('/courses/search', courseController.searchCourse)

//get one course
router.get('/courses/:id', courseController.getOneCourse)

//course enrollment
router.post('/courses/:id/enrol', isLoggedIn, courseController.enrollInCourse)

//new course
router.post("/courses/postcourse", courseController.postCourse)

//update course
router.put('/courses/:id/updatecourse', isLoggedIn, courseController.updateCourse)

//delete Course
router.delete('/courses/:id/deletecourse', isLoggedIn, courseController.deleteCourse)


//Add Topics
router.post('/courses/:id/addtopics', courseController.addTopics)

//Update Topics
router.put('/courses/:id/updatetopics', courseController.updateTopics)

//Delete Topics
router.delete('/courses/:id/deletetopics', courseController.deleteTopics)


module.exports = router