const express = require('express');
const router = express.Router({ mergeParams: true });

const courseController = require('../controllers/course.controller')
const { IsAdmin } = require('../middlewares/auth')

const branches = ['cse', 'mnc', 'ece', 'eee', 'me', 'ep', 'bt', 'cst', 'ce']
const allbranches = branches.join('|')

//Courses Routes

//get all courses 
router.get('/', courseController.getAllCourses);

//search courses
router.get('/search', courseController.searchCourse)

//get all courses of specific branch
router.get(`/:branch(${allbranches})?`, courseController.branchcourses)

//get one course
router.get('/:id', courseController.getOneCourse)

//get number of subscribers
router.get('/:id/subscribers', courseController.getsubscribers)

//course enrollment
router.post('/:id/enrol', courseController.enrollInCourse)

//new course
router.post("/postcourse", courseController.imageName, courseController.courseImageUpload, courseController.postCourse)

//update course
router.put('/:id/updatecourse', courseController.imageName, courseController.courseImageUpload, courseController.updateCourse)

//delete Course
router.delete('/:id/deletecourse', courseController.deleteCourse)

//Add Topics
router.post('/:id/addtopics', courseController.addTopics)

//Update Topics
router.put('/:id/updatetopics', courseController.updateTopics)

//Delete Topics
router.delete('/:id/deletetopics', courseController.deleteTopics)


module.exports = router