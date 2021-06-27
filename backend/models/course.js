const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* const TopicSchema = new Schema(
    {
        title: { type: String, required: [true, "Topic Must have a name!!!"], unique: true }
    }
) */

const courseSchema = new mongoose.Schema({
    topic : { type : String, default : "NA"},
    title: {
        type: String,
        required: [true, "Course must have a title"],
        unique: [true, "Course name is not unique"]
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User', require: true
    },
    subtopics: {
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
    enrollmentkey: String,
    subscribers: { type: Number, min: [0, 'subscribers can not be negative!!!'], default: 0 },
    branch: {
        type: String,   //enum : ['CSE','MNC','ECE','EEE','ME','EP','BT','CST','CE']
        required: true,
    }

})

module.exports = mongoose.model('Course', courseSchema)