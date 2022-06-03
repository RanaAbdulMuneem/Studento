const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  location: { type: String, required: false },
  primaryRole: { type: String, required: false },
  university: { type: String, required: false },
  degree: { type: String, required: false },
  major: { type: String, required: false },
  photo: {type: String, default: 'default-user.png'},
  graduationYear: { type: String, required: false },
  universityDescription: { type: String, required: false },
  experience: { type: String, required: false },
  achievements: { type: String, required: false },
  skills: { type: String, required: false },
  saved_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  applied_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  verified: { type: Boolean, default: false },
  code: { type: String, required: true },
});

const model = mongoose.model('Student', Student)
module.exports = model
