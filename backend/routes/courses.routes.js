const express = require('express');
const router = express.Router({ mergeParams: true });

const courseController = require('../controllers/course.controller')
const { IsAdmin } = require('../middlewares/auth')

const branches = ['cse', 'mnc', 'ece', 'eee', 'me', 'ep', 'bt', 'cst', 'ce']
const allbranches = branches.join('|')

//Courses Routes

//testing routes
router.get('/testing', courseController.getTeamRecordings)

//get all courses 
router.get('/', courseController.getAllCourses);

//search courses
router.get('/search', courseController.searchCourse)

//get all courses of specific branch
router.get(`/:branch(${allbranches})?`, courseController.branchcourses)

//get all courses of specific topic
router.get('/topic/:topic', courseController.gettopicCourses)

//get one course
router.get('/:id', courseController.getOneCourse)

//get course discussion
router.get('/:id/discussion',courseController.getDiscussion);
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
router.post('/:id/addsubtopics', courseController.addsubTopics)

//Update Topics
router.put('/:id/updatesubtopics', courseController.updatesubTopics)

//Delete Topics
router.delete('/:id/deletesubtopics', courseController.deletesubTopics)

//Courses Resources Routes
router.post('/:id/addresources', courseController.courseresourcesUpload)

router.delete('/:id/deleteresources', courseController.deleteResources)

module.exports = router