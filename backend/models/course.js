const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* const TopicSchema = new Schema(
    {
        title: { type: String, required: [true, "Topic Must have a name!!!"], unique: true }
    }
) */

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Course must have a title"],
        unique: [true, "Course name is not unique"]
    },
    author: {
        id : { type: String, required: [true, "Author must have a id"] },
        name: { type: String, required: [true, "Course must have an author"] },
        email: { type: String, required: [true, "Author must have an email"] }
    },
    topics: {
        type: [{
            title: String
        }],
        default: []
    },
    description: {
        type: String,
        required: true
    },
    imgPath: String,
    videos: [String],
    enrollmentkey: String
})

module.exports = mongoose.model('Course', courseSchema)