var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken")

const Job = require('../models/job.model');
const Application = require('../models/application.model')
const Company = require('../models/company.model')
const Student = require('../models/student.model')

router.get('/', async (req, res) => {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || "0");
    
    
    //FILTER LOGIC
    let query = {};
    req.query.minPay && (query.minPay = {$gte: parseInt(req.query.minPay)});
    req.query.education && (query.education = req.query.education);
    req.query.type && (query.jobType = req.query.type);
    req.query.domain && (query.jobDomain = {$in: req.query.domain});
    req.query.skills && (query.skills = {$in: req.query.skills});
    try {
        const jobs = await Job.find(query)
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page));
        const results = (await Job.find(query)).length;
        const pageCount = Math.ceil(results / PAGE_SIZE);
        res.status(200).json({
            results,
            pageCount,
            jobs
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
})


router.post("/addjob", async (req, res) => {
  console.log(req.body)
  const { skills } = req.body;
  const skillsArr = skills.split(",");
  
 

  await Job.create({
    company : req.body.id,
    jobTitle: req.body.jobTitle,
    jobType: req.body.jobType,
    education: req.body.education,
    jobLocation: req.body.jobLocation,
    jobDomain: req.body.jobDomain,
    minPay: req.body.minPay,
    jobDescription: req.body.jobDescription,
    skills: skillsArr,
    dateCreated: req.body.dateCreated
  });
});


router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id);
    if (job) {
      res.status(200).json(job);
    }
    else {
      res.status(404);
    }
  }
  catch (error) {
    console.log(error);
    res.status(500);
  }
})

router.post('/:id/apply', async (req, res) => {
  console.log('APPLYING', req.headers["token"]);
  if (!req.headers["token"]){
    res.status(401).json({status: "error"});
  }
  else {
    try {
      const decodedToken = jwt.verify(req.headers["token"], "somerandomsetofsymbols");
      const job = await Job.findById(req.params.id);
      const company = await Company.findById(job.company);
      const student = await Student.findById(decodedToken.id);
      if (job) {
        const exists = await Application.findOne({student: decodedToken.id, job: job._id});
        if (exists) {
          res.status(400).send("Application already submitted");
        }
        else {
          await Application.create({student: decodedToken.id, job: job._id, jobTitle : job.jobTitle, company: job.company, status: "Pending", companyName: company.name, studentName: student.name});
          res.status(200).json({
            job: job._id,
            student: decodedToken.id
          });
        }
      }
      else {
        res.status(404);
      }
    }
    catch (error) {
      console.log(error);
      res.status(500);
    }
  }
})

router.get('/:id/isapplied', async (req, res) => {
  if (!req.headers["token"]){
    res.status(401).json({status: "error"});
  }
  else {
    try {
      const decodedToken = jwt.verify(req.headers["token"], "somerandomsetofsymbols");
      const exists = await Application.findOne({student: decodedToken.id, job: req.params.id})
      if (exists) {
        res.status(200).json({applied: true})
      }
      else {
        res.status(200).json({applied: false})
      }
    }
    catch (error) {
      console.log(error);
      res.status(500);
    }
  }
})


// router.get('/getapplicant', async (req, res) => {
//   try {
//     const id = req.body.id;
//     const job = await Job.findById(id);
//     if (job) {
//       res.status(200).json(job);
//     }
//     else {
//       res.status(404);
//     }
//   }
//   catch (error) {
//     console.log(error);
//     res.status(500);
//   }
// })




module.exports = router;