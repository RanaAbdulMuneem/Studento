var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Company = require("../models/company.model");

const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, callback) =>  {
    callback(null, "./client/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
})

const upload = multer({storage: storage});

router.get("/", function (req, res, next) {
  res.send("Companies router");
});

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
      return { status: "error", error: "Invalid login" };
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
        expiresIn: 3600
      });
    } else {
      return res.status(401).json({
        token: false 
      });
    }
  });


  
router.get("/profile", async (req, res) => {
  console.log("reached profile")
    if (!req.headers["token"]){
      res.status(401).json({status: "error"});
    }
    else {
      try {
        const decodedToken = jwt.verify(req.headers["token"], "somerandomsetofsymbols");
        const id = decodedToken.id;
        Company.findOne({_id: id}, (err, doc) => {
          if (err){
            res.status(500);
          }
          else {
            res.json(doc);
          }
        });
      }
      catch (error) {
        console.log(error);
        res.status(500).send("Invalid token");
      }
    }
  });



router.post("/edit", upload.single("companyImage"), async (req, res) => {
   console.log("inside server /edit ")
  console.log(req.body)
  Company.updateOne(
    { email: req.body.email },
    {
      name: req.body.name,
      description: req.body.description,
      noOfEmployees: parseInt(req.body.noOfEmployees),
      yearFounded: parseInt(req.body.yearFounded),
      companyImage: req.file.originalname
    },
    function (err) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(200);
      }
    }
  );
});


  module.exports = router;