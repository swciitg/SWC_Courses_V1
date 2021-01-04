let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let courseSchema = new Schema({
  title: {
    type: String,
    unique: [true, "Course Name is not unique"],
    required: [true, "A course must have a name"],
  },
  author: { type: String, required: true },
  topics: [String],
  description: { type: String, required: true },
  imgPath: { type: String },
  videos: [{ type: mongoose.ObjectId, ref: "Media" }],
});

module.exports = mongoose.model("Course", courseSchema);
