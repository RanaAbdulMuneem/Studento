const mongoose = require('mongoose')

const Application = new mongoose.Schema (
    {
        student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
        job: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true},
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
        status: {type:String, required: true},
        
        //---------------TO BE REMOVED------------------
        jobTitle: {type:String, required: true},
        companyName: {type:String, required: true},
        studentName: {type:String, required: true}
        //----------------------------------------------
    }
)

const model = mongoose.model('Application', Application);

module.exports = model;