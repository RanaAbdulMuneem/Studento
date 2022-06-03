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
  graduationYear: { type: String, required: false },
  universityDescription: { type: String, required: false },
  experience: { type: String, required: false },
  achievements: { type: String, required: false },
  skills: { type: Array, required: false },
  saved_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobData" }],
  applied_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobData" }],
  verified: { type: Boolean, default: false },
  code: { type: String, required: true },
});

const model = mongoose.model("StudentData", Student);

module.exports = model;
