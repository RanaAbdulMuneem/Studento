var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Company = require("../models/company.model");
const Application = require("../models/application.model");

const verify_token = require("../utils/token")

router.get("/", function (req, res, next) {
  res.send("Companies router");
});

// router.get("/profile", async (req, res) => {
//   console.log("reached profile")
//     if (!req.headers["token"]){
//       res.status(401).json({status: "error"});
//     }
//     else {
//       try {
//         const decodedToken = jwt.verify(req.headers["token"], "somerandomsetofsymbols");
//         const id = decodedToken.id;
//         Company.findOne({_id: id}, (err, doc) => {
//           if (err){
//             res.status(500);
//           }
//           else {
//             res.json(doc);
//           }
//         });
//       }
//       catch (error) {
//         console.log(error);
//         res.status(500).send("Invalid token");
//       }
//     }
//   });

router.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
      const newPassword = await bcrypt.hash(req.body.companyPassword, 10);
      await Company.create({
        name: req.body.companyName,
        email: req.body.companyEmail,
        password: newPassword,
      });
      res.json({ status: "ok" });
    } catch (err) {
      console.log(err);
      res.json({ status: "error", error: "Duplicate email" });
    }
  });

router.post("/login", async (req, res) => {
  const user = await Company.findOne({
    email: req.body.companyEmail,
  });

  if (!user) {
    res.status(401).send('Email not found');
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.companyPassword,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      "somerandomsetofsymbols",
      {expiresIn: "1h"}
    );

    return res.status(200).json({
      token: token,
      id: user._id,
      type: 'company',
      expiresIn: 3600
    });
  } else {
    return res.status(401).send('Incorrect password');
  }
});




// NEW ENDPOINTS
//?company=
router.get('/profile', async (req, res) => {
  if (!req.query.company) {
    res.status(401).send("No company id");
    return;
  }
  try {
    const company = await Company.findById(req.query.company, {password: 0, jobs: 0});
    if (!company) {
      res.status(401).send('Company not found');
    }
    res.status(200).json(company);
  }
  catch (error) {
    console.log(error);
    res.status(500);
  }
})

router.get("/:id", async (req, res) => {
  const token = req.headers['token'];
  if (!verify_token(token)){
      console.log('Invalid token!');
      res.status(401).send('Invalid token!');
      return;
  }

  try {
    const company = await Company.findById(req.params.id, {password: 0, jobs: 0});
    if (!company) {
      res.status(401).send('Company not found');
    }
    else {
      res.status(200).json(company);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.get("/:id/stats", async (req, res) => {
  const token = req.headers['token'];
  if (!verify_token(token)){
      console.log('Invalid token!');
      res.status(401).send('Invalid token!');
      return;
  }

  try {
    const company = await Company.findById(req.params.id, {password: 0, jobs: 0});
    if (!company) {
      res.status(401).send('Company not found');
      return;
    }
    const applications = await Application.find({company: company._id});
    const app_total = applications.length;
    let accept_total = 0;
    let reject_total = 0;
    for (let i=0; i<app_total; i++) {
      applications[i].status === 'Accepted' && (accept_total++);
      applications[i].status === 'Rejected' && (reject_total++);
    }
    res.status(200).json({
      totalApplications: app_total,
      totalAccepted: accept_total,
      totalRejected: reject_total
    });
  }
  catch (error) {
    res.status(500);
  }
});

//?page=
router.get("/:id/applications/", async (req, res) => {
  const token = req.headers['token'];
  if (!verify_token(token)){
      console.log('Invalid token!');
      res.status(401).send('Invalid token!');
      return;
  }
  
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      res.status(401).send('Company not found');
      return;
    }
    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || '0');
    const results = await (await Application.find({company: company._id})).length;
    const pageCount = Math.ceil(results/PAGE_SIZE);
    const applications = await Application.find({company: company._id}).populate([
      {path: 'student', select:{_id:1, name:1}},
      {path: 'job', select:{_id:1, jobTitle:1}}
    ])
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE*page)
    ;

    res.status(200).json({
      pageCount,
      applications
    });
  }
  catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.patch("/:id/resolve-application/", async (req, res) => {
  const token = req.headers['token'];
  if (!verify_token(token)){
      console.log('Invalid token!');
      res.status(401).send('Invalid token!');
      return;
  }
  if (!req.body.application || !req.body.status) {
    res.status(401).send("No application id or status");
    return;
  }

  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      res.status(401).send("Company not found");
      return;
    }
    const application = await Application.findById(req.body.application);
    if (!application || application.status!=='Pending') {
      res.status(401).send("Application not found or already resolved");
      return;
    }
    application.status = req.body.status;
    await application.save();
    res.status(200).send(`Application ${application.status}`);
  }
  catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;