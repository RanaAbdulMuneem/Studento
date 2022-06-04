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

(async () => {
    console.log('Clearing db');
    await Student.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});

    console.log('Creating students');
    const muneem = new Student({
        name: 'Abdul Muneem',
        email: 'muneem@mail.com',
        password: password,
        age: 21,
        gender: 'Male',
        location: 'Lahore, Pakistan',
        primaryRole: 'Developer',
        university: 'FAST NUCES',
        degree: 'CS',
        major: 'CS',
        graduationYear: '2021',
        universityDescription: 'Top Tier CS university',
        experience: 'None',
        achievements: 'High achiever',
        skills: 'C++, Python',
        saved_jobs: [],
        applied_jobs: [],
        verified: true,
        code: '123',
    })
    await muneem.save();
    const behzad = new Student({
        name: 'Behzad Khokher',
        email: 'behzad@mail.com',
        password: password,
        age: 22,
        gender: 'Male',
        location: 'Lahore, Pakistan',
        primaryRole: 'Engineer',
        university: 'FAST NUCES',
        degree: 'CS',
        major: 'CS',
        graduationYear: '2021',
        universityDescription: 'Top Tier CS university',
        experience: 'PHP stuff',
        achievements: 'High achiever',
        skills: 'C++, Python',
        saved_jobs: [],
        applied_jobs: [],
        verified: true,
        code: '123',
    })
    await behzad.save();
    const ali = new Student({
        name: 'Ali Qumail',
        email: 'ali@mail.com',
        password: password,
        age: 21,
        gender: 'Male',
        location: 'Lahore, Pakistan',
        primaryRole: 'Backend Developer',
        university: 'FAST NUCES',
        degree: 'CS',
        major: 'CS',
        graduationYear: '2021',
        universityDescription: 'Top Tier CS university',
        experience: 'Freelancing',
        achievements: 'High achiever',
        skills: 'C++, Python',
        saved_jobs: [],
        applied_jobs: [],
        verified: true,
        code: '123',
    })
    await ali.save();

    console.log('Creating companies');
    const arbisoft = new Company({
        name: 'Arbisoft',
		email: 'arbisoft@mail.com',
		password: password,
        noOfEmployees: 450,
        yearFounded: 2015,
        description: 'We provide software solutions. Come join us and thrive.',
        city: 'Lahore',
        country: 'Pakistan',
        jobs: []
    })
    await arbisoft.save();
    const devsinc = new Company({
        name: 'Devsinc',
		email: 'devsinc@mail.com',
		password: password,
        noOfEmployees: 200,
        yearFounded: 2018,
        description: 'Fastest growing CS company in Pakistan',
        city: 'Lahore',
        country: 'Pakistan',
        jobs: []
    })
    await devsinc.save();

    console.log('Creating jobs');
    for (let i=0; i<15; i++) {
        const job = new Job({
            company: arbisoft._id,
            jobTitle: `Software Engineer ${i+1}`,
            education: i%2==0? "Junior": "Senior",
            jobType: i%3==0? "Part-time": "Freelance",
            jobLocation: i%2==0? "On site": "Hybrid",
            jobDomain: "Software Engineering",
            minPay: 1000*(i+1),
            jobDescription: "From the windows to the walls, we need someone to clean the bathroom stalls",
            skills: ["C++", "Python", "JavaScript"],
            dateCreated: Date.now(),
        })
        await job.save();
        arbisoft.jobs.push(job._id);
        await arbisoft.save();
    }
    for (let i=0; i<15; i++) {
        const job = new Job({
            company: devsinc._id,
            jobTitle: `Web Developer ${i+1}`,
            education: i%2==0? "Sophomore": "Freshman",
            jobType: i%3==0? "Internship": "Freelance",
            jobLocation: i%2==0? "On site": "Hybrid",
            jobDomain: "Web Development",
            minPay: 500*(i+1),
            jobDescription: "From the windows to the walls, we need someone to clean the bathroom stalls",
            skills: ["React", "NodeJs", "JavaScript"],
            dateCreated: Date.now(),
        })
        await job.save();
        devsinc.jobs.push(job._id);
        await devsinc.save();
    }

    console.log('Creating applications')

    for (let i=5; i<15; i++){
        const job = await Job.findById(arbisoft.jobs[i]);
        const app = new Application({
            student: muneem._id,
            job: job._id,
            company: arbisoft._id,
            status: 'Pending',
            //---------------TO BE REMOVED------------------
            jobTitle: job.jobTitle,
            companyName: arbisoft.name,
            studentName: muneem.name
            //----------------------------------------------
        })
        await app.save();
        muneem.applied_jobs.push(app._id);
        await muneem.save();
    }
    for (let i=0; i<10; i++){
        const job = await Job.findById(arbisoft.jobs[i]);
        const app = new Application({
            student: behzad._id,
            job: job._id,
            company: arbisoft._id,
            status: 'Pending',
            //---------------TO BE REMOVED------------------
            jobTitle: job.jobTitle,
            companyName: arbisoft.name,
            studentName: behzad.name
            //----------------------------------------------
        })
        await app.save();
        behzad.applied_jobs.push(app._id);
        await behzad.save();
    }

    console.log('All done!');
    return;
})();