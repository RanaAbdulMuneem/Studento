const mongoose = require('mongoose')

const Company = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        noOfEmployees: { type: Number, required: true },
        yearFounded: { type: Number, required: true },
        description: { type: String, required: true }
	}

)

const model = mongoose.model('CompanyData', Company)

module.exports = model
