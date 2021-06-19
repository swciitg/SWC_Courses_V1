const Course = require('../models/course')
const User = require('../models/user')

exports.searchCourse = async (req, res) => {
    try {
        const foundCourse = await Course.find(
            {
                $or: [
                    { author: { $regex: req.query.dsearch, $options: "i" } },
                    { title: { $regex: req.query.dsearch, $options: "i" } },
                    { topics: { $regex: req.query.dsearch, $options: "i" } },
                ],
            }
        )
        if (!foundCourse) {
            return res.status(404).json({ msg: "No Course Found!" })
        }
        res.status(200).json(foundCourse)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message })
    }
}

exports.getAllCourses = async (req, res, next) => {
    try {
        let courses = await Course.find();
        if (courses.length) {
            return res.status(200).json({ courses });
        } else {
            return res.status(404).json({ msg: "No Course Found!" })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message })
    }
}

exports.getOneCourse = async (req, res, next) => {
    try {
        if (!req.user) {
            //if user is not signed in
            let course = await Course.findOne({ _id: req.params.id })
            if (course) {
                // course exists
                return res.status(200).json(course)
            } else {
                return res.status(404).json({ msg: "Course Not Found" })
            }
        } else {
            // if user is signed in 
            let getcourse = Course.findOne({ _id: req.params.id })
            let getuser = User.findOne({
                _id: req.user._id,
                coursesTaken: req.params.id
            })
            let [user, course] = await Promise.all([getuser, getcourse])
            let isEnrolled = false;
            if (course) {
                // course exists
                if (user) {
                    isEnrolled = true;
                }
                return res.status(200).json({
                    isEnrolled,
                    course,
                })
            }
            else {
                // course doesn't exists
                return res.status(404).json({ msg: "Course Not Found" })
            }
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ error: err.message })
    }
}

exports.enrollInCourse = async (req, res, next) => {
    try {
        const { enrollmentkey } = req.body
        let getcourse = Course.findOne({ _id: req.params.id });
        let getuser = User.findOne({ _id: req.user._id });

        let [user, course] = await Promise.all([getuser, getcourse]);

        if (course) {
            if (course.enrollmentkey === enrollmentkey) {
                if (!user.coursesTaken.includes(course._id)) {
                    //not Enrolled
                    user.coursesTaken.push(course._id)
                    await user.save()
                    return res.status(200).json({ msg: "Successfully Enrolled!!!" })
                }
                else {
                    return res.status(400).json({ msg: "Already Enrolled!!!" })
                }
            }
            else {
                //enrollement key dosnt match
                return res.status(403).json({ msg: "Wrong Enrollment Key" })
            }
        }
        else {
            // course dosn't exists
            return res.status(404).json({ msg: "Course Not Found" })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: err.message })
    }
}