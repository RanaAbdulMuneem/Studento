const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Company = require("./models/company.model");
const Student = require("./models/student.model");
const Job = require("./models/Job.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/StudentoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/companysignup", async (req, res) => {
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

app.post("/companylogin", async (req, res) => {
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

app.get("/getallcompanies", async (req, res) => {
  const companies = await Company.find();
  return res.json(companies);
});

app.post("/editcompanyprofile", async (req, res) => {
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

app.post("/addjob", async (req, res) => {
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

app.post("/studentsignup", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.studentPassword, 10);
    await Student.create({
      name: req.body.studentName,
      email: req.body.studentEmail,
      password: newPassword,
      age: 0,
      gender: "m",
      location: "none",
      primaryRole: "none",
      university: "none",
      degree: "none",
      major: "none",
      universityDescription: "none",
      graduationYear: 0,
      achievements: "none",
      experience: "none",
      skills: "none",
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/studentlogin", async (req, res) => {
  const user = await Student.findOne({
    email: req.body.studentEmail,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.studentPassword,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/findstudent", async (req, res) => {
  console.log(req.body.email);
  Student.find({ email: req.body.email }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

app.post("/editstudentprofile", async (req, res) => {

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

app.listen(3001, () => {
  console.log("Server started on 3001");
});
