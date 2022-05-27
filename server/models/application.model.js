const mongoose = require('mongoose')

const Application = new mongoose.Schema (
    {
        student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
        job: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true},
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}
    }
)

const model = mongoose.model('Application', Application);

module.exports = model;