var mongoose = require("mongoose");
let Schema = mongoose.Schema
let bookmarkSchema = new Schema({
	video: { type: mongoose.ObjectId, ref: 'Media' },
	timestamp: { type: String },
	text: { type: String },
})

let courseSchema = new Schema({
	course: { type: mongoose.ObjectId, ref: 'Course' },
	completed_videos: [{ type: mongoose.ObjectId, ref: 'Media' }],
	last_view: new Schema({
		video: { type: mongoose.ObjectId, ref: 'Media' },
		timestamp: { type: String }
	}),
	Bookmarks: [bookmarkSchema]
})

let userSchema = new Schema({
	email: { type: String, unique: true },
	name: { type: String },
	password: { type: String },
	passwordResetToken: { type: String },
	passwordResetExpires: { type: Date },
	isAdmin: { type: Boolean, default: false },
	isverified: { type: Boolean, default: false },
	enrolled_courses: [courseSchema],
	enrolled_courses_id: [{ type: mongoose.ObjectId, ref: 'Course' }]
}, {
	versionKey: false // set to false then it wont create in mongodb
});

module.exports = mongoose.model("User", userSchema);