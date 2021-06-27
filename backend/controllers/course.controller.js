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
        const foundCourses1 = Course.find(
            {
                $or: [
                    { title: { $regex: queryterm, $options: "i" } },
                    { branch: { $regex: queryterm, $options: "i" } },
                    { 'subtopics.title': { $regex: queryterm, $options: "i" } },
                    { topic: { $regex: queryterm, $options: "i" } },
                ],
            }
        )
        const foundCourses2 = User.findOne({ name: { $regex: queryterm, $options: "i" } }, 'coursesTeach').populate('coursesTeach')
        let [array1, array2] = await Promise.all([foundCourses1, foundCourses2])
        let foundCourses = [...new Set([...array1, ...array2.coursesTeach])]
        if (!foundCourses.length) {
            return res.status(404).json({ msg: "No Courses Found!" })
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
                _id: "60d4d36a1a333b305c5fa983",
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

exports.getsubscribers = async (req, res) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id)
        if (course) {
            return res.send(200).json({ status: true, subscribers: subscribers })
        }
        else {
            return res.status(404).json({ msg: "No Course Found!" })
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.branchcourses = async (req, res) => {
    try {
        const { branch } = req.params
        const foundcourses = await Course.find({ branch: branch })
        if (foundcourses.length) {
            return res.status(200).json({ status: true, courses: foundcourses })
        }
        else {
            return res.status(404).json({ msg: "No Courses Found!" })
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.gettopicCourses = async (req, res) => {
    try {
        const { topic } = req.params
        const foundcourses = await Course.find({ topic : topic })
        if (foundcourses.length) {
            return res.status(200).json({ status: true, courses: foundcourses })
        }
        else {
            return res.status(404).json({ msg: "No Courses Found!" })
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
        let getuser = User.findById("60d4d36a1a333b305c5fa983")
        let [user, course] = await Promise.all([getuser, getcourse]);
        const ENROLLMENTKEY = course.enrollmentkey || enrollmentkey
        if (course) {
            if (!user.coursesTaken.includes(course._id)) {
                if (ENROLLMENTKEY === enrollmentkey) {
                    //not Enrolled
                    user.coursesTaken.push(course._id)
                    course.subscribers++
                    let task1 = course.save()
                    let task2 = user.save()
                    await Promise.all([task1, task2])
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
        const { topic, title, subtopics, description, enrollmentkey, branch } = req.body
        let fields = {};
        fields.subtopics = []
        if (topic) fields.topic = topic
        if (description) fields.description = description
        if (title) fields.title = title
        if (enrollmentkey) fields.enrollmentkey = enrollmentkey
        if (subtopics) {
            subtopics.forEach(subtopic => {
                fields.subtopics.push({ title: subtopic })
            })
        }
        if (branch) fields.branch = branch
        let imgPath = ""
        if (req.file) {
            console.log(req.file)
            imgPath = dirpath + "/assets/courseimages/" + req.file.filename
        }
        fields.imgPath = imgPath
        let course = new Course(fields)
        course.author = "60d4d36a1a333b305c5fa983"//"60d4d36a1a333b305c5fa983"
        let savecourse = course.save()
        let getuser = User.findById("60d4d36a1a333b305c5fa983")
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
            const { title, description, enrollmentkey, branch, topic } = req.body;
            let update = {}
            if(topic)fields.topic = topic
            if (description) update.description = description
            if (title) update.title = title
            if (enrollmentkey) update.enrollmentkey = enrollmentkey
            if (branch) update.branch = branch
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
            let user = await User.findById(course.author)
            let idx = user.coursesTeach.indexOf(id)
            if (idx != -1) user.coursesTeach.splice(idx, 1)
            let task1 = Course.findByIdAndDelete(id)
            let task2 = user.save()
            let task3 = User.updateMany({}, { $pull: { coursesTaken: id } })
            await Promise.all([task1, task2, task3])
            if (course.imgPath !== "") {
                fs.unlinkSync(course.imgPath)
            }
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

exports.addsubTopics = async (req, res) => {
    console.log("Add subTopics End Point Hit")
    try {
        const { id } = req.params
        const { subtopics } = req.body
        let course = await Course.findById(id)
        if (!course) return res.status(404).json({ msg: "Course Not Found" })
        const subtopicsarray = course.subtopics.map(subtopic => subtopic.title)
        subtopics.forEach(subtopic => {
            if (!subtopicsarray.includes(subtopic)) course.subtopics.push({ title: subtopic })
        })
        await course.save()
        return res.status(200).json({ status: true, msg: "subTopics Successfully Added!!!" })
        // course dosn't exists
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.updatesubTopics = async (req, res) => {
    console.log("Update subTopics End Point Hit")
    try {
        const { id } = req.params
        const { dquery } = req.body
        let course = await Course.findById(id)
        if (!course) return res.status(404).json({ msg: "Course Not Found" })
        const subtopicsarray = course.subtopics.map(subtopic => subtopic.title)
        dquery.forEach(query => {
            let idx = subtopicsarray.indexOf(query.oldname)
            if (idx != -1) course.subtopics[idx].title = query.newname
        })
        await course.save()
        return res.status(200).json({ status: true, msg: "subTopics Successfully Updated!!!" })
        // course dosn't exists
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
}

exports.deletesubTopics = async (req, res) => {
    try {
        const { id } = req.params
        const { subtopics } = req.body
        let course = await Course.findByIdAndUpdate(id, { $pull: { subtopics: { title: { $in: subtopics } } } }, { new: true })
        if (course) {
            return res.status(200).json({ status: true, msg: "subTopics Successfully Deleted!!!", course })
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

