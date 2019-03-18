const express = require("express");
const router = express.Router();
const College = require("../models/college");

//register college
router.post("/register", (req, res) => {
  const college = new College({
    collegeName: req.body.collegeName,
    collegeEmail: req.body.collegeEmail,
    collegeAddress: req.body.collegeAddress,
    collegeContact: req.body.collegeContact,
    collegeCity: req.body.collegeCity,
    collegeRNumber: req.body.collegeRNumber,
    user_id: req.body.user_id
  });

  college
    .save()
    .then(result => {
      console.log(result);

      res.json({
        success: true,
        message: "College registered successfully, please login to continue"
      });
    })
    .catch(err => {
      res.json({ success: false, message: "Something went wrong!" });
      console.log(err);
    });
});

//get all colleges
router.get("/getcolleges", (req, res) => {
  College.find((err, result) => {
    if (result) {
      res.json({ success: true, result });
    } else {
      res.json({ success: false, message: "Something went wrong" });
    }
  });
});

//update college status
router.put("/updatecollege", (req, res) => {
  const collegeName = req.body.collegeName;
  const action = req.body.action;
  College.updateOne(
    { collegeName: collegeName },
    { $set: { collegeStatus: action } },
    (err, raw) => {
      if (err) {
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    }
  );
});

module.exports = router;
