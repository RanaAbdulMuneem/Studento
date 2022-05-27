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
    await Company.create({
        name: "Devsinc",
        email: "devsinc@mail.com",
        password: password,
    })

    let company = await Company.findOne({name: "Arbisoft"});
    console.log('Creating jobs')
    for (let i=0; i<30; i++){
        await Job.create({
        company: company._id,
        jobTitle: "Software Engineer " + i,
        education: i%2==0? "Senior": "Junior",
        jobType: "Part-time",
        jobLocation: "On site",
        jobDomain: "Software Engineering",
        minPay: 1000*i,
        jobDescription: "Plz make software for us, We pay",
        skills: ["C++", "Python", "JavaScript", "MERN", "React"],
        dateCreated: Date.now()
        })
    }
    company = await Company.findOne({name: "Devsinc"});
    for (let i=0; i<30; i++){
        await Job.create({
        company: company._id,
        jobTitle: "Web Developer " + i,
        education: i%2==0? "Highschool": "Sophomore",
        jobType: i%3==0? "Part-time": "Freelance",
        jobLocation: i%2==0? "On site": "Hybrid",
        jobDomain: "Software Engineering",
        minPay: 1000*i,
        jobDescription: "Plz make software for us, We pay",
        skills: ["C++", "Python", "JavaScript", "MERN", "React"],
        dateCreated: Date.now()
        })
    }
    
    console.log("seeded!");
    return;
})();