const Course = require('../models/course')
const User = require('../models/user')
const { dirpath } = require('../dirname')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { runInNewContext } = require('vm')


//Course Image Uploading Code
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = dirpath + "/assets/courseimages"
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, req.imagename + path.extname(file.originalname))
    }
})

const checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).single("image")

exports.searchCourse = async (req, res) => {
    try {
        const queryterm = req.query.dsearch
        const foundCourses = await Course.find(
            {
                $or: [
                    {
                        'author.name': {
                            $regex: queryterm, $options: "i"
                        }
                    },
                    { title: { $regex: queryterm, $options: "i" } },
                    { 'topics.title': { $regex: queryterm, $options: "i" } },
                ],
            }
        )
        if (!foundCourses) {
            return res.status(404).json({ msg: "No Course Found!" })
        }
        res.status(200).json({ status: true, courses: foundCourses })
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
        console.log("POST course route hit")
        const { title, topics, description, enrollmentkey } = req.body
        let fields = {};
        if (description) fields.description = description
        if (title) fields.title = title
        if (enrollmentkey) fields.enrollmentkey = enrollmentkey
        if (topics) fields.topics = topics
        let imgPath = ""
        if (req.file) {
            console.log(req.file)
            imgPath = dirpath + "/assets/courseimages/" + req.file.filename
        }
        fields.imgPath = imgPath
        let course = new Course(fields)
        course.author = {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
        let savecourse = course.save()
        let getuser = User.findById("60d324111528bb1cd0c383e5")
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
            const { title, description, enrollmentkey } = req.body;
            let update = {}
            if (description) update.description = description
            if (title) update.title = title
            if (enrollmentkey) update.enrollmentkey = enrollmentkey
            let imgPath = ""
            if (req.file) {
                console.log(req.file)
                imgPath = dirpath + "/assets/courseimages/" + req.file.filename
                update.imgPath = imgPath
                if (course.imgPath !== "") {
                    fs.unlinkSync(course.imgPath)
                }
            }
            const updatedCourse = await Course.findByIdAndUpdate(id, update, { new: true })
            return res.status(200).json({ status: true, msg: "Course Successfully Updated!!!", updatedCourse })
        }
        else {
            // course dosn't exists
            return res.status(404).json({ msg: "Course Not Found" })
        }
    }

    catch (err) {
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
            let user = await User.findById(course.author.id)
            let idx = user.coursesTeach.indexOf(id)
            if (idx != -1) user.coursesTeach.splice(idx, 1)
            if (course.imgPath !== "") {
                fs.unlinkSync(course.imgPath)
            }
            await Course.findByIdAndDelete(id)
            await user.save()
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
    console.log("Add Topics End Point Hit")
    try {
        const { id } = req.params
        const { topics } = req.body
        let course = await Course.findById(id)
        if (!course) return res.status(404).json({ msg: "Course Not Found" })
        const topicsarray = course.topics.map(topic => topic.title)
        topics.forEach(topic => {
            if (!topicsarray.includes(topic)) course.topics.push({ title: topic })
        })
        await course.save()
        return res.status(200).json({ status: true, msg: "Topics Successfully Added!!!" })
        // course dosn't exists
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.updateTopics = async (req, res) => {
    console.log("Update Topics End Point Hit")
    try {
        const { id } = req.params
        const { dquery } = req.body
        let course = await Course.findById(id)
        if (!course) return res.status(404).json({ msg: "Course Not Found" })
        const topicsarray = course.topics.map(topic => topic.title)
        dquery.forEach(query => {
            let idx = topicsarray.indexOf(query.oldname)
            if (idx != -1) course.topics[idx].title = query.newname
        })
        await course.save()
        return res.status(200).json({ status: true, msg: "Topics Successfully Updated!!!" })
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
        let course = await Course.findByIdAndUpdate(id, { $pull: { topics: { title: { $in: topics } } } }, { new: true })
        if (course) {
            return res.status(200).json({ status: true, msg: "Topics Successfully Deleted!!!", course })
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

//Middlewares

//Course Image name middleware

exports.imageName = (req, res, next) => {
    req.imagename = "image-" + Date.now()
    next()
}

exports.courseImageUpload = async (req, res, next) => {
    upload(req, res, err => {
        console.log("Upload Hit!!!")
        if (err) {
            console.log(err)
            return res.status(500).json({ status: false, error: err.message })
        }
        else {
            console.log(req.file)
            if (req.file) {
                console.log("File Successfully Uploaded!!!")
            }
            else {
                console.log("something went wrong when uploading the file");
            }
            return next()
        }
    })
}

