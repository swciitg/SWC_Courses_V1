const Media = require("../models/media");
const User = require("../models/user");
const Course = require("../models/course");


exports.getVideo = async (req, res, next) => {
    try {
        let getcourse = await Course.findOne({ _id: req.params.id }).populate("videos");
        let getvideo = Media.findOne({
            _id: req.params.video_id,
            course: req.params.id,
        });
        let getuser = User.findOne({
            _id: req.user._id,
            "enrolled_courses.course": req.params.id,
        });
        let [user, video, course] = await Promise.all([
            getuser,
            getvideo,
            getcourse,
        ]);

        if (user && video) {
            let courseIndex = user.enrolled_courses.findIndex((courseItem) => {
                return courseItem.course == req.params.id;
            });

            //console.log(user.enrolled_courses[courseIndex])
            console.log(getcourse.videos)
            //let foundVideo=Media.findById(req.params.video_id)
            res.render("video", {
                video: video,
                course: course,
                bookmarks: user.enrolled_courses[courseIndex].Bookmarks,
            });
        } else {
            error = { status: 400, message: "Course-video mismatch" };
            throw error;
        }
    } catch (err) {
        next(err);
    }
}

exports.addBookmark = async (req, res, next) => {
    try {
        let getcourse = Course.findOne({ _id: req.params.id });
        let getvideo = Media.findOne({
            _id: req.params.video_id,
            course: req.params.id,
        });
        let getuser = User.findOne({
            _id: req.user._id,
            "enrolled_courses.course": req.params.id,
        });
        let [user, video, course] = await Promise.all([
            getuser,
            getvideo,
            getcourse,
        ]);
        //debugger;
        if (user && video) {
            let courseIndex = user.enrolled_courses.findIndex((courseItem) => {
                return courseItem.course == req.params.id;
            });

            let newBookmark = user.enrolled_courses[courseIndex].Bookmarks.create({
                video: mongoose.Types.ObjectId(req.params.video_id),
                timestamp: req.body.time,
                text: req.body.text,
            });

            user.enrolled_courses[courseIndex].Bookmarks.push(newBookmark);

            let updatedUser = await user.save();

            res.json({
                bookmark: newBookmark,
                video: video,
                course: course,
            });
        } else {
            error = { status: 400, message: "Course-video mismatch" };
            throw error;
        }
    } catch (err) {
        next(err);
    }
}

exports.deleteBookmark = async (req, res, next) => {
    try {
        let getvideo = Media.findOne({ '_id': req.params.video_id, 'course': req.params.id })
        let getuser = User.findOne({ '_id': req.user._id, 'enrolled_courses.course': req.params.id })
        let [user, video] = await Promise.all([getuser, getvideo])
        //debugger;
        if (user && video) {
            let courseIndex = user.enrolled_courses.findIndex(courseItem => {
                return courseItem.course == req.params.id
            })

            var index = user.enrolled_courses[courseIndex].Bookmarks.findIndex(bookmark => {
                return bookmark._id.equals(req.params.book_id);
            })

            var foundBookmark = user.enrolled_courses[courseIndex].Bookmarks.filter(bookmark => {
                if (bookmark._id.equals(req.params.book_id)) {
                    return bookmark;
                }
            })

            if (index > -1) {
                user.enrolled_courses[courseIndex].Bookmarks.splice(index, 1);
            }

            let updated = await user.save()

            //console.log(foundBookmark);
            res.json(foundBookmark)
        }
        else {
            error = { 'status': 400, 'message': 'Course-video mismatch' }
            throw error
        }
    }
    catch (err) {
        next(err)
    }

    //res.send("You have reached delete route")

}