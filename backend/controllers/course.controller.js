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
        return res.status(500).json({ status: false, error: err.message })
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
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.enrollInCourse = async (req, res, next) => {
    try {
        const { enrollmentkey } = req.body
        let getcourse = Course.findOne({ _id: req.params.id });
        let getuser = User.findById(req.user._id)

        let [user, course] = await Promise.all([getuser, getcourse]);
        const ENROLLMENTKEY = course.enrollmentkey || enrollmentkey
        if (course) {
            if (!user.coursesTaken.includes(course._id)) {
                if (ENROLLMENTKEY === enrollmentkey) {
                    //not Enrolled
                    user.coursesTaken.push(course._id)
                    await user.save()
                    return res.status(200).json({ msg: "Successfully Enrolled!!!" })
                }
                else {
                    //enrollement key dosnt match
                    return res.status(403).json({ msg: "Wrong Enrollment Key" })
                }
            }
            else {
                return res.status(400).json({ msg: "Already Enrolled!!!" })
            }
        }
        else {
            // course dosn't exists
            return res.status(404).json({ msg: "Course Not Found" })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.postCourse = async (req, res) => {
    try {
        const { title, topics, description, imgPath, enrollmentkey } = req.body
        let course = new Course({ title, topics, description, imgPath, enrollmentkey })
        course.author = "60cf3a60f947240f145c986b"
        let savecourse = course.save()
        let getuser = User.findById("60cf3a60f947240f145c986b")
        let [user, newCourse] = await Promise.all([getuser, savecourse])
        user.coursesTeach.push(newCourse._id)
        await user.save()
        return res.status(200).json({ status: true, course: newCourse })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params
        let course = await Course.findById(id)
        if (course) {
            //course exists
            const { title, author, description, enrollmentkey } = req.body;
            const update = { title, author, description, enrollmentkey };
            const updatedCourse = await Course.findByIdAndUpdate(id, update, { new: true })
            return res.status(200).json({ status: true, msg: "Course Successfully Updated!!!", updatedCourse })
        }
        else {
            // course dosn't exists
            return res.status(404).json({ msg: "Course Not Found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.deleteCourse = async (req, res) => {
    // Pending :- Delete All Videos related to course
    try {
        const { id } = req.params
        let course = await Course.findById(id)
        if (course) {
            //course exists
            await Course.findByIdAndDelete(id)
            return res.status(200).json({ status: true, msg: "Course Successfully Deleted!!!" })
        }
        else {
            // course dosn't exists
            return res.status(404).json({ msg: "Course Not Found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.addTopics = async (req, res) => {
    try {
        const { id } = req.params
        const { topics } = req.body
        let course = await Course.findById(id)
        if(!course)return res.status(404).json({ msg: "Course Not Found" })
        topics.forEach(topic => {
            if(course.topics)
        })
        await course.save()
        return res.status(200).json({ status: true, msg: "Topics Successfully Added!!!" })
        // course dosn't exists
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.deleteTopics = async (req, res) => {
    try {
        const { id } = req.params
        const { topics } = req.body
        let course = await Course.findByIdAndUpdate(id, { $pull: { topics: { $in: topics } } }, { new: true })
        if (course) {
            //course exists
            //unique topic name
            await course.save()
            return res.status(200).json({ status: true, msg: "Topics Successfully Deleted!!!" })
        }
        else {
            // course dosn't exists
            return res.status(404).json({ msg: "Course Not Found" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}



