const Student = require('../models/student.model');
const Company = require('../models/company.model')
const Job = require('../models/job.model');
const bcrypt = require ('bcryptjs')
const password = bcrypt.hashSync('12345678', 10);
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/StudentoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async() => {
    console.log('Clearing db')
    await Student.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});

    console.log('Creating students')
    await Student.create({
        name: "Abdul Muneem",
        email: "muneem@mail.com",
        password: password,
    })
    await Student.create({
        name: "Ali Qumail",
        email: "ali@mail.com",
        password: password,
    })
    await Student.create({
        name: "Behzad Khokher",
        email: "behzad@mail.com",
        password: password,
    })
    console.log('Creating companies')
    await Company.create({
        name: "Arbisoft",
        email: "arbisoft@mail.com",
        password: password,
    })

    const company = await Company.findOne({name: "Arbisoft"}).exec();
    const _id = company._id;
    console.log("arbisoft", company)
    console.log('Creating jobs')
    for (let i=0; i<30; i++){
        await Job.create({
        company: _id,
        jobTitle: "Software engineer " + i,
        education: "Bachelors",
        jobType: "Full time",
        jobLocation: "On site",
        jobDomain: "Software engineering",
        minPay: 70000,
        jobDescription: "Plz make software for us, We pay",
        skills: ["C++", "Python,", "JavaScript", "MERN", "ReactJS"],
        dateCreated: Date.now()
        })
    }
    
    console.log("seeded!");
    return;
})();