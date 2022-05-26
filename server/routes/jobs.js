var express = require('express');
var router = express.Router();

const Job = require('../models/job.model');

router.get('/', async (req, res) => {
    const PAGE_SIZE = 10;
    console.log('Sending jobs');
    const page = parseInt(req.query.page || "0")
    
    try {
        const jobs = await Job.find({})
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page));
        const results = await Job.countDocuments({});
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

router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            res.status(200).json(job)
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


module.exports = router;