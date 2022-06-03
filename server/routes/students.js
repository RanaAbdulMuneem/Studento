var express = require("express");
var nodemailer = require("nodemailer");

var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const Student = require("../models/student.model");
const Otp = require("../models/otp.model");
const Job = require("../models/job.model");
const Application = require("../models/application.model");
const Company = require("../models/company.model");

const verify_token = require("../utils/token");

const { removeListener } = require("../models/student.model");

// UPLOAD IMAGE
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

const sendEmail = (targetEmail, sub, content) => {
  // *********************
  // NodeMailer Mail Send
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "studento.assist@gmail.com",
      pass: "Studentosupport1",
    },
  });

  var mailOptions = {
    from: "studento.assist@gmail.com",
    to: targetEmail,
    subject: sub,
    text: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  // *********************
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Students router");
});

router.get("/email-activation/:email/:token", async (req, res) => {
  // console.log(req.body);
  // res.json({ status: "ok" });
  try {
    const user = await Student.findOne({
      email: req.params.email,
      token: req.params.token,
    });

    if (user) {
      console.log("found");

      Student.updateOne(
        { email: req.params.email },
        {
          verified: true,
        },
        function (err) {
          if (err) {
            console.log(err);
            res.status(500);
          }
        }
      );

      res.json({ status: "updated", message: "User has been registered" });
    }
    if (!user) {
      console.log("not found");
      res.json({ status: "error", error: "error" });
      return { status: "error", error: "Invalid" };
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "error" });
  }
});

router.post("/password-update", async (req, res) => {
  console.log(req.body);

  try {
    const user = await Student.findOne({
      email: req.body.studentEmail,
      code: req.body.studentToken,
    });
    if (user) {
      console.log("found");
      const newPassword = await bcrypt.hash(req.body.studentPassword, 10);

      user.password = newPassword;
      await user.save();
      // Student.updateOne(
      //   { email: req.body.studentEmail },
      //   {
      //     password: newPassword,
      //   },
      //   function (err) {
      //     if (err) {
      //       console.log(err);
      //       res.status(500);
      //       res.json({ status: "error", error: "error" });
      //     }
      //   }
      // );

      res.json({ status: "updated", message: "User Password rest" });
    }
    if (!user) {
      console.log("not found");
      res.json({ status: "error", error: "error" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "error" });
  }
});

router.post("/password-reset", async (req, res) => {
  console.log(req.body);
  const otp = Math.floor(Math.random() * 1000000000000 + 1);

  try {
    const user = await Student.findOne({
      email: req.body.studentEmail,
    });

    if (user) {
      console.log("found");

      Student.updateOne(
        { email: req.body.studentEmail },
        {
          code: otp,
        },
        function (err) {
          if (err) {
            console.log(err);
            res.status(500);
            res.json({ status: "error", error: "error" });
          }
        }
      );

      resetLink =
        "http://localhost:3000/passwordreset/" +
        req.body.studentEmail +
        "/" +
        otp;

      content =
        "Dear, User" +
        " You have requested password reset. Click Here To reset account: " +
        resetLink;

      sendEmail(req.body.studentEmail, "Password Reset", content);

      res.json({ status: "updated", message: "User reset sent" });
    }
    if (!user) {
      console.log("not found");
      res.json({ status: "error", error: "error" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "error" });
  }
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const student = await Student.findOne({email: req.body.studentEmail}, {password: 0});
    if (student) {
      res.status(401).json({
        registered: true,
        msg: "Already registered"
      });
      return;
    }
    
    const newPassword = await bcrypt.hash(req.body.studentPassword, 10);
    const otp = Math.floor(Math.random() * 1000000000000 + 1);
    await Student.create({
      name: req.body.studentName,
      email: req.body.studentEmail,
      password: newPassword,
      code: otp,
    });
    res.json({ status: "ok" });

    activationLink =
      "http://localhost:3001/students/email-activation/" +
      req.body.studentEmail +
      "/" +
      otp;
    content =
      "Dear, " +
      req.body.studentName +
      " You have successfully registed an account. Click Here To activate account: " +
      activationLink;

    sendEmail(req.body.studentEmail, "Welcome To Studento", content);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

router.post("/login", async (req, res) => {
  const user = await Student.findOne({
    email: req.body.studentEmail,
  });

  if (!user) {
    res.status(401).send("Email not found");
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.studentPassword,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      "somerandomsetofsymbols",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token: token,
      id: user._id,
      type: "student",
      expiresIn: 3600,
    });
  } else {
    return res.status(401).send("Incorrect password");
  }
});

// router.get("/profile", async (req, res) => {
//   if (!req.headers["token"]) {
//     res.status(401).json({ status: "error" });
//   } else {
//     try {
//       const decodedToken = jwt.verify(
//         req.headers["token"],
//         "somerandomsetofsymbols"
//       );
//       const id = decodedToken.id;
//       Student.findOne({ _id: id }, (err, doc) => {
//         if (err) {
//           res.status(500);
//         } else {
//           res.json(doc);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Invalid token");
//     }
//   }
// });

router.route("/edit").post(upload.single("photo"), async (req, res) => {
  if (!req.headers["token"]) {
    res.status(401).json({ status: "error" });
  } else {
    try {
      const decodedToken = jwt.verify(
        req.headers["token"],
        "somerandomsetofsymbols"
      );
      const id = decodedToken.id;
      let query = {};
      console.log(req.body)
      req.body.name && (query.name = req.body.name);
      req.body.description && (query.description = req.body.description);
      req.body.age && (query.age = req.body.age);
      req.body.gender && (query.gender = req.body.gender);
      req.body.primaryRole && (query.primaryRole = req.body.primaryRole);
      req.body.university && (query.university = req.body.university);
      req.body.universityDescription &&
        (query.universityDescription = req.body.universityDescription);
      req.body.degree && (query.degree = req.body.degree);
      req.body.major && (query.major = req.body.major);
      req.body.achievments && (query.achievements = req.body.achievments);
      req.body.experience && (query.experience = req.body.experience);
      req.body.skills && (query.skills = req.body.skills);
      req.body.graduationYear &&
        (query.graduationYear = req.body.graduationYear);

      req.file && (query.photo = req.file.filename);

      Student.updateOne({ _id: id }, query, function (err) {
        if (err) {
          console.log(err);
          res.status(500);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Invalid token");
    }
  }
});

router.post("/email-send", async (req, res) => {
  // let data = await Student.findOne({ email: req.body.email });
  //let data = await Student.findOne({ email: req.body.studentEmail });
  console.log(req.body);
  const data = await Student.findOne({
    email: req.body.studentEmail,
  });

  console.log(req.body.studentEmail);
  const response = {};
  if (data) {
    const mail = req.body.studentEmail;
    let otpcode = Math.floor(Math.random() * 1000 + 1);

    let otpData = new Otp({
      email: mail,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    response.status = "success";
    response.message = "Check Your Inbox :)";
    console.log("otp code is : %d", otpcode);
    // *********************
    // NodeMailer Mail Send
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "studento.assist@gmail.com",
        pass: "Studentosupport1",
      },
    });

    var mailOptions = {
      from: "studento.assist@gmail.com",
      to: req.body.studentEmail,
      subject: "Sending Email using Node.js",
      text: "Your otp code is: " + otpcode,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // *********************
  } else {
    response.status = "error";
    response.message = "Email Id not exist";
  }

  res.status(200).json(response);
});

router.post("/change-password", async (req, res) => {
  res.status(200).json("ok");
});

//NEW ENDPOINTS
//?student=
router.get("/profile", async (req, res) => {
  if (!req.query.student) {
    res.status(401).send("No student id");
    return;
  }
  try {
    const student = await Student.findById(req.query.student, {
      password: 0,
      saved_jobs: 0,
      applied_jobs: 0,
    });
    if (!student) {
      res.status(401).send("Student not found");
    }
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.get("/:id", async (req, res) => {
  const token = req.headers["token"];
  if (!verify_token(token)) {
    console.log("Invalid token!");
    res.status(401).send("Invalid token!");
    return;
  }

  try {
    const student = await Student.findById(req.params.id, {
      password: 0,
    }).populate([
      {
        path: "saved_jobs",
        select: { _id: 1, company: 1, jobTitle: 1, jobType: 1 },
        populate: {
          path: "company",
          select: { name: 1 },
        },
      },
      {
        path: "applied_jobs",
        select: { job: 1, status: 1 },
        populate: [
          { path: "job", select: { jobTitle: 1 } },
          { path: "company", select: { name: 1 } },
        ],
      },
    ]);
    if (!student) {
      res.status(401).send("Student not found");
    } else {
      res.status(200).json(student);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.route("/:id/edit").patch(upload.single("photo"), async (req, res) => {
  const token = req.headers["token"];
  if (!verify_token(token)) {
    console.log("Invalid token!");
    res.status(401).send("Invalid token!");
    return;
  }

  try {
    const student = await Student.findById(req.params.id, {
      password: 0,
    }).populate([
      {
        path: "saved_jobs",
        select: { _id: 1, company: 1, jobTitle: 1, jobType: 1 },
        populate: {
          path: "company",
          select: { name: 1 },
        },
      },
      {
        path: "applied_jobs",
        select: { job: 1, status: 1 },
        populate: [
          { path: "job", select: { jobTitle: 1 } },
          { path: "company", select: { name: 1 } },
        ],
      },
    ]);
    if (!student) {
      res.status(401).send("Student not found");
      return;
    }
    req.body.name && (student.name = req.body.name);
    req.body.age && (student.age = parseInt(req.body.age));
    req.body.gender && (student.gender = req.body.gender);
    req.body.location && (student.location = req.body.location);
    req.body.primaryRole && (student.primaryRole = req.body.primaryRole);
    req.body.university && (student.university = req.body.university);
    req.body.universityDescription && (student.universityDescription = req.body.universityDescription);
    req.body.degree && (student.degree = req.body.degree);
    req.body.major && (student.major = req.body.major);
    req.body.achievements && (student.achievements = req.body.achievements);
    req.body.experience && (student.experience = req.body.experience);
    req.body.skills && (student.skills = req.body.skills);
    req.body.graduationYear && (student.graduationYear = req.body.graduationYear);
    req.file && ( student.photo = req.file.filename )

    await student.save();
    res.status(200).json(student);

  }
  catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.get("/:id/applications", async (req, res) => {
  const token = req.headers["token"];
  if (!verify_token(token)) {
    console.log("Invalid token!");
    res.status(401).send("Invalid token!");
    return;
  }
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(401).send("Student not found");
      return;
    }
    const applications = await Application.find({
      student: student._id,
    }).populate({
      path: "job",
      select: { company: 1, jobTitle: 1 },
      populate: {
        path: "company",
        select: { password: 0 },
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//?job=
router.post("/:id/apply", async (req, res) => {
  const token = req.headers["token"];
  if (!verify_token(token)) {
    console.log("Invalid token!");
    res.status(401).send("Invalid token!");
    return;
  }
  if (!req.query.job) {
    console.log("No job id");
    res.status(401).send("No job id");
    return;
  }
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(401).send("Student not found");
      return;
    }
    const job = await Job.findById(req.query.job);
    if (!job) {
      res.status(401).send("Job not found");
    }

    //---------------TO BE REMOVED -----------------------
    const company = await Company.findById(job.company);
    if (!company) {
      res.status(401).send("Company not found");
    }
    //-----------------------------------------------------
    const app = await Application.findOne({
      student: student._id,
      job: job._id,
    });
    if (app) {
      const index = student.applied_jobs.indexOf(app._id);
      if (index != -1) {
        student.applied_jobs.splice(index, 1);
        await student.save();
        await Application.findByIdAndDelete(app._id);
      }
      res.status(200).send("Application unsubmitted");
      return;
    }
    const application = new Application({
      student: student._id,
      job: job._id,
      //---------------TO BE REMOVED -----------------------
      jobTitle: job.jobTitle,
      company: job.company,
      companyName: company.name,
      studentName: student.name,
      status: "Pending",
      //-----------------------------------------------------
    });
    await application.save();
    student.applied_jobs.push(application._id);
    await student.save();
    res.status(200).send("Application submitted");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//?job=
router.post("/:id/save", async (req, res) => {
  const token = req.headers["token"];
  if (!verify_token(token)) {
    console.log("Invalid token!");
    res.status(401).send("Invalid token!");
    return;
  }
  if (!req.query.job) {
    console.log("No job id");
    res.status(401).send("No job id");
    return;
  }

  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      console.log("Student not found");
      res.status(401);
      return;
    }
    const job = await Job.findById(req.query.job);
    if (!job) {
      console.log("Job not found");
      res.status(401);
      return;
    }

    let i;
    let found = false;
    console.log(student.saved_jobs.length);
    for (i = 0; i < student.saved_jobs.length; i++) {
      if (student.saved_jobs[i].toString() === req.query.job) {
        found = true;
        break;
      }
    }
    if (found) {
      student.saved_jobs.splice(i, 1);
      await student.save();
      res.status(200).send("Job unsaved");
    } else {
      student.saved_jobs.push(job._id);
      await student.save();
      res.status(200).json({
        saved: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;
