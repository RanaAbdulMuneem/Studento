var express = require('express');
var router = express.Router();

//OLD ENDPOINTS

const Student = require("../models/student.model");
const Company = require("../models/company.model")
const Job = require("../models/job.model")

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/companysignup", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.companyPassword, 10);
    await Company.create({
      name: req.body.companyName,
      email: req.body.companyEmail,
      password: newPassword,
      noOfEmployees: 0,
      yearFounded: 0,
      description: "none",
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

router.post("/companylogin", async (req, res) => {
  const user = await Company.findOne({
    email: req.body.companyEmail,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.companyPassword,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        noOfEmployees: user.noOfEmployees,
        yearFounded: user.yearFounded,
        description: user.description,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
});

router.get("/getallcompanies", async (req, res) => {
  const companies = await Company.find();
  return res.json(companies);
});

router.post("/editcompanyprofile", async (req, res) => {
  const { name, email, description, noOfEmployees, yearFounded } =
    await req.body;
  console.log(req.body);
  Company.updateOne(
    { email: email },
    {
      name: name,
      description: description,
      noOfEmployees: parseInt(noOfEmployees),
      yearFounded: parseInt(yearFounded),
    },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

router.post("/addjob", async (req, res) => {
  const { skills } = req.body;
  const skillsArr = skills.split(",");
  console.log(skillsArr);
  Job.create({
    companyName: req.body.companyName,
    companyEmail: req.body.companyEmail,
    jobTitle: req.body.jobTitle,
    jobType: req.body.jobType,
    education: req.body.education,
    jobLocation: req.body.jobLocation,
    jobDomain: req.body.jobDomain,
    minPay: req.body.minPay,
    jobDescription: req.body.jobDescription,
    skills: skillsArr,
  });
});

router.post("/editstudentprofile", async (req, res) => {

  console.log(req.body);
  
  
  Student.updateOne(
    { email: req.body.email },
    {
      name: req.body.name,
      description: req.body.description,
      age: parseInt(req.body.age),
      location: req.body.location,
      primaryRole:req.body.primaryRole,
      university: req.body.university,
      degree: req.body.degree,
      major: req.body.major,
      universityDescription: req.body.universityDescription,
      graduationYear: req.body.graduationYear,
      achievments: req.body.achievments,
      experience: req.body.experience,
      Skills: req.body.skills

    },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});


module.exports = router;
