const Student = require('../models/student.model');
const Company = require('../models/company.model')
const Job = require('../models/job.model');
const Application = require('../models/application.model')
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
    await Application.deleteMany({});

    console.log('Creating students')
    await Student.create({
        name: "Abdul Muneem",
        email: "muneem@mail.com",
        password: password,
        saved_jobs: [],
        applied_jobs: [],
        verified: true,
        code: '123',
    })
    await Student.create({
        name: "Ali Qumail",
        email: "ali@mail.com",
        password: password,
        saved_jobs: [],
        applied_jobs: [],
        verified: true,
        code: '123',
    })
    await Student.create({
        name: "Behzad Khokher",
        email: "behzad@mail.com",
        password: password,
        saved_jobs: [],
        applied_jobs: [],
        verified: true,
        code: '123',
    })
    console.log('Creating companies')
    await Company.create({
        name: "Arbisoft",
        email: "arbisoft@mail.com",
        password: password,
        city: 'Lahore',
        country: 'Pakistan'
    })
    await Company.create({
        name: "Devsinc",
        email: "devsinc@mail.com",
        password: password,
        city: 'Lahore',
        country: 'Pakistan'
    })

    let company = await Company.findOne({name: "Arbisoft"});
    console.log('Creating jobs')
    for (let i=0; i<30; i++){
        const job = new Job({
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
        await job.save();
        company.jobs.push(job._id);
        await company.save();
    }
    company = await Company.findOne({name: "Devsinc"});
    for (let i=0; i<30; i++){
        const job = new Job({
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
        await job.save();
        company.jobs.push(job._id);
        await company.save();
    }
    
    console.log("seeded!");
    return;
})();