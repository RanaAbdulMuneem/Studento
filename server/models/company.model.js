const mongoose = require('mongoose')

const Company = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        noOfEmployees: { type: Number, required: false },
        yearFounded: { type: Number, required: false },
        description: { type: String, required: false }
	}

)

const model = mongoose.model('CompanyData', Company)

module.exports = model
