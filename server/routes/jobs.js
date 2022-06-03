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
    req.query.search && (query.jobTitle = RegExp('.*'+req.query.search+'*.'))
    try {
        const jobs = await Job.find(query)
        .populate({
          path: 'company',
          select: {name: 1, city: 1, country: 1, photo: 1}
        })
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
  const { skills } = req.body;
  const skillsArr = skills.split(",");
  
  const company = await Company.findById(req.body.id);
  let job = new Job({
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
  })
  await job.save();
  company.jobs.push(job._id);
  await company.save();
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