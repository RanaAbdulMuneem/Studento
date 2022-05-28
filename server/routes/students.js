var express = require("express");
var nodemailer = require("nodemailer");

var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/student.model");
const Otp = require("../models/otp.model");

const { removeListener } = require("../models/student.model");

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

module.exports = router;
