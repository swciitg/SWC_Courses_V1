const express = require('express');
const router = express.Router({ mergeParams: true });

const courseController = require('../controllers/course.controller')
const { IsAdmin } = require('../middlewares/auth')

//Graph Routes
router.get('/:id/teamrecordings', courseController.getTeamRecordings)

router.get('/:id/updaterecordings',courseController.saveNewRecordings)

router.get('/userdetails', courseController.getUserDetails)

router.get('/joinedteams', courseController.getJoinedTeams)

router.get('*', courseController.getUserDetails)

module.exports = router;