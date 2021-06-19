const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Course must have a title"],
        unique: [true, "Course name is not unique"]
    },
    author: {
        type: String,
        required: [true, "Course must have an author"]
    },
    topics: [String],
    description: {
        type: String,
        required: true
    },
    imgPath: String,
    videos: [String],
    enrollmentkey : String
})

module.exports = mongoose.model('Course',courseSchema)