var express = require("express");
var router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

//OLD ENDPOINTS

const Student = require("../models/student.model");
const Company = require("../models/company.model");
const Job = require("../models/job.model");
const Application = require("../models/application.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

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

router
  .route("/editcompanyprofile")
  .post(upload.single("photo"), async (req, res) => {
    const {  email } =
      req.body;
      
      let query = {};
      req.body.name && (query.name = req.body.name);
      req.body.email && (query.email = req.body.email);
      req.body.description && (query.description = req.body.description);
      req.body.noOfEmployees && (query.noOfEmployees = parseInt(req.body.noOfEmployees));
      req.body.yearFounded && (query.yearFounded = req.body.yearFounded);
      req.body.location && (query.location = req.body.location);
      req.file && ( query.photo = req.file.filename )
      
      
     Company.updateOne(
      { email: email }, query,
     
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.send(200);
        }
      }
    );
  });

// router.post("/addjob", async (req, res) => {
//   const { skills } = req.body;
//   const skillsArr = skills.split(",");
//   console.log(skillsArr);
//   Job.create({
//     companyName: req.body.companyName,
//     companyEmail: req.body.companyEmail,
//     jobTitle: req.body.jobTitle,
//     jobType: req.body.jobType,
//     education: req.body.education,
//     jobLocation: req.body.jobLocation,
//     jobDomain: req.body.jobDomain,
//     minPay: req.body.minPay,
//     jobDescription: req.body.jobDescription,
//     skills: skillsArr,
//   });
// });

router.post("/editstudentprofile", async (req, res) => {
  Student.updateOne(
    { email: req.body.email },
    {
      name: req.body.name,
      description: req.body.description,
      age: parseInt(req.body.age),
      location: req.body.location,
      primaryRole: req.body.primaryRole,
      university: req.body.university,
      degree: req.body.degree,
      major: req.body.major,
      universityDescription: req.body.universityDescription,
      graduationYear: req.body.graduationYear,
      achievments: req.body.achievments,
      experience: req.body.experience,
      Skills: req.body.skills,
    },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

//-----------------------LEGACY-------------------------
router.get("/getallapplications", async (req, res) => {
  console.log("reached in applications");
  const applications = await Application.find();
  return res.json(applications);
});
//-----------------------LEGACY-------------------------

router.post("/updateapplication", async (req, res) => {
  console.log(req.body);
  Application.updateOne(
    { _id: req.body.id },
    {
      status: req.body.status,
    },
    function (err) {
      if (err) {
        console.log(err);
        res.status(500);
      }
    }
  );
});

module.exports = router;
