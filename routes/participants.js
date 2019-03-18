const express = require("express");
const moment = require("moment");
const router = express.Router();
const Participant = require("../models/participant");

router.post("/participate", (req, res) => {
  const participant = new Participant({
    name: req.body.name,
    event_id: req.body.event_id,
    event_title: req.body.event_title,
    event_propdate: req.body.event_propdate,
    user_id: req.body.user_id,
    contact: req.body.contact,
    college: req.body.college,
    payment_status: req.body.payment_status,
    payment_mode: req.body.payment_mode,
    date_participated: moment().format("MMMM Do YYYY")
  });

  participant.save().then(result => {
    if (result) {
      res.json({
        success: true,
        message:
          "Participation successful, please complete the payment with specified mode."
      });
    } else {
      res.json({
        success: false,
        message: "Something went wrong!"
      });
    }
  });
});

router.get("/list/:id", (req, res) => {
  let id = req.params.id;
  Participant.find({ event_id: id }, (err, result) => {
    res.json(result);
  });
});

router.get("/mylist/:id", (req, res) => {
  let id = req.params.id;
  Participant.find({ user_id: id }, (err, result) => {
    res.json(result);
  });
});

module.exports = router;
