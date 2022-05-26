const mongoose = require('mongoose')

const Job = new mongoose.Schema(
	{
        company: {type: mongoose.Schema.Types.ObjectID, ref: 'Company', required: true},
        jobTitle: { type: String, required: true},
		education: { type: String, required: true },
        jobType: { type: String, required: true },
        jobLocation: { type: String, required: true },
        jobDomain: { type: String, required: true },
        minPay: { type: Number, required: true },
        jobDescription: { type: String, required: true },
        skills: { type: Array, required: true },
        dateCreated: { type: Date, required: true}
	}

)

const model = mongoose.model('JobData', Job)

module.exports = model
