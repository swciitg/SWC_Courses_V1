let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    title: { type: String},
    filepath: { type: String},
    course : {type : mongoose.ObjectId, ref: "Course"},
    thumbnail: { type: String},
    viewcount: { type: Number, default: 0 },
    duration: { type: Number},
    releasedate: {type : Date, default: Date.now },
    index: { sectionIndex: { type: Number }, videoIndex: { type: Number } },
});

module.exports = mongoose.model("Media",mediaSchema);