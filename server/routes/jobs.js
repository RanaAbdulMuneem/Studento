var express = require('express');
var router = express.Router();

const Job = require('../models/job.model');

router.get('/', async (req, res) => {
    const PAGE_SIZE = 10;
    console.log('Sending jobs');
    const page = parseInt(req.query.page || "0");
    
    
    //FILTER LOGIC
    let query = {};
    req.query.minPay && (query.minPay = {$gte: parseInt(req.query.minPay)});
    req.query.education && (query.education = req.query.education);
    req.query.type && (query.jobType = req.query.type);
    req.query.domain && (query.jobDomain = {$in: req.query.domain});
    req.query.skills && (query.skills = {$in: req.query.skills});
    console.log(query)
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


module.exports = router;