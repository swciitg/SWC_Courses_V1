let Course = require("../models/course")
let Media = require("../models/media")
let User = require("../models/user")

exports.getAllCourses = async (req, res, next) => {
    try {
        let courses = await Course.find();
        if (courses.length) {
            return res.status(200).json(courses);
        }
        else {
            return res.status(404).json({ message: 'No courses found' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getOneCourse = async (req, res, next) => {
    try {
        if (!req.user) {
            //the user is not signed in
            let course = await Course.findOne({ '_id': req.params.id })
            if (course) {
                //the course exists
                return res.status(200).json(course);
            }
            else {
                //the course does not exist
                return res.status(404).json({ message: 'Course not found' });
            }
        }
        else {
            //if the user is signed in
            let getcourse = Course.findOne({ '_id': req.params.id })
            let getuser = User.findOne({ '_id': req.user._id, 'enrolled_courses.course': req.params.id })
            //run the queries parallely and wait for their results
            let [user, course] = await Promise.all([getuser, getcourse])
            let isEnrolled = false
            if (course) {
                //the course exists
                if (user) { isEnrolled = true }
                let userData = {} //stores user-specific course details(like % completed etc)
                if (isEnrolled) {
                    await user.enrolled_courses.forEach(function (courseData) {
                        if (courseData.course.equals(course._id)) {
                            userData = course;
                        }
                    })
                }
                Media.find({ course: course._id }, function (err, media) {
                    if (err) { throw err }
                    else {
                        return res.status(200).json({ isEnrolled: isEnrolled, media: media, course: course, userData: userData });
                    }
                })
            }
            else {
                //the course does not exist
                return res.status(404).json({ message: 'No courses found' });
            }
        }
    }
    catch (err) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.enrollInCourse = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized, please login to enrol' })
        }

        //user is signed in
        let getcourse = Course.findOne({ '_id': req.params.id })
        let getuser = User.findOne({ '_id': req.user._id })

        let [user, course] = await Promise.all([getuser, getcourse])
        //run the queries parallely and wait for their results

        if (course) {
            //the course id is valid
            user.enrolled_courses.push({
                'course': course._id
            })
            user.enrolled_courses_id.push(course._id)
            updated = await user.save()
            return res.redirect("/courses/" + course._id)
        }
        else {
            //if the id doesn't belong to an existing course
            error = {
                'status': 404,
                'message': "No such course found"
            }
            throw error
        }
    }
    catch (err) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}