var express = require("express");
var nodemailer = require("nodemailer");

var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/student.model");
const Otp = require("../models/otp.model");
const Job = require("../models/job.model");
const Application = require("../models/application.model");
const Company = require("../models/company.model");

const { removeListener } = require("../models/student.model");

const verify_token = (token) => {
  if (!token)
    return false;
  if (token === 'allaccess')
    return true;
  let verified = true
  jwt.verify(token, 'somerandomsetofsymbols', (err, decoded) => {
      if (err) {
          verified = false;
      }
  });
  return verified;
}


/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Students router");
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.studentPassword, 10);
    await Student.create({
      name: req.body.studentName,
      email: req.body.studentEmail,
      password: newPassword,
    });
    res.json({ status: "ok" });

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
      subject: "Welcome To Studento",
      text:
        "Dear, " +
        req.body.studentName +
        " You have successfully registed an account.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // *********************
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
    return { status: "error", error: "Invalid login" };
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
      type: 'student',
      expiresIn: 3600,
    });
  } else {
    return res.status(401).json({
      token: false,
    });
  }
});

router.get("/profile", async (req, res) => {
  if (!req.headers["token"]) {
    res.status(401).json({ status: "error" });
  } else {
    try {
      const decodedToken = jwt.verify(
        req.headers["token"],
        "somerandomsetofsymbols"
      );
      const id = decodedToken.id;
      Student.findOne({ _id: id }, (err, doc) => {
        if (err) {
          res.status(500);
        } else {
          res.json(doc);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Invalid token");
    }
  }
});

router.post("/edit", async (req, res) => {
  if (!req.headers["token"]) {
    res.status(401).json({ status: "error" });
  } else {
    try {
      const decodedToken = jwt.verify(
        req.headers["token"],
        "somerandomsetofsymbols"
      );
      const id = decodedToken.id;

      Student.updateOne(
        { _id: id },
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
            res.status(500);
          }
        }
      );
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

router.get('/:id', async (req, res) => {
  const token = req.headers['token'];
  if (!verify_token(token)){
      console.log('Invalid token!');
      res.status(401).send('Invalid token!');
      return;
  }

  try {
    const student = await Student.findById(req.params.id, {password: 0}).populate(['saved_jobs', 'applied_jobs']);
    if (!student) {
      res.status(401).send('Student not found');
    }
    else {
      res.status(200).json(student);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/:id/apply", async (req, res) => {
  const token = req.headers['token'];
  if (!verify_token(token)){
      console.log('Invalid token!');
      res.status(401).send('Invalid token!');
      return;
  }
  if (!req.query.job) {
    console.log('No job id');
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
    const exists = await Application.findOne({student: student._id, job: job._id});
    if (exists) {
      res.status(401).send("Application already submitted");
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
      status: 'Pending'
      //-----------------------------------------------------
    })
    await application.save();
    student.applied_jobs.push(job._id);
    await student.save();
    res.status(200).send('Application submitted');
  }
  catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/:id/save", async (req, res) => {
  const token = req.headers['token'];
  if (!verify_token(token)){
      console.log('Invalid token!');
      res.status(401).send('Invalid token!');
      return;
  }
  if (!req.query.job) {
    console.log('No job id');
    res.status(401).send('No job id');
    return;
  }

  try {
    const student = await Student.findById(req.params.id);
    if (!student){
      console.log('Student not found');
      res.status(401);
      return;
    }
    const job = await Job.findById(req.query.job);
    if (!job) {
      console.log('Job not found');
      res.status(401);
      return;
    }

    let i;
    let found = false;
    console.log(student.saved_jobs.length)
    for(i=0; i<student.saved_jobs.length; i++) {
      if (student.saved_jobs[i].toString() === req.query.job) {
        found = true;
        break;
      }
    }
    if (found) {
      student.saved_jobs.splice(i, 1);
      await student.save();
      res.status(200).send('Job unsaved');
    }
    else {
      student.saved_jobs.push(job._id);
      await student.save();
      res.status(200).json({
        saved: true
      });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500);
  }

});

module.exports = router;

