const mongoose = require('mongoose')

const Student = new mongoose.Schema(
	{
		name: { type: String, required: true},
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        location: { type: String, required: true },
        primaryRole: { type: String, required: true },
        university: { type: String, required: true },
        degree : { type: String, required: true },
        major: { type: String, required: true },
        graduationYear: { type: String, required: true },
        universityDescription: { type: String, required: true },
        experience : { type: String, required: true },
        achievements : { type: String, required: true },
        skills: { type: String, required: true }
	}

)

const model = mongoose.model('StudentData', Student)

module.exports = model
