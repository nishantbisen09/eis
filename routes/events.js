const express = require("express");
const ContentBasedRecommender = require("content-based-recommender");
const moment = require("moment");
const router = express.Router();
const Event = require("../models/event");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploadEventImage = multer({ storage: storage });

//Create event

router.post("/postevent", (req, res) => {
  Event.countDocuments((err, count) => {
    const event = new Event({
      event_id: count + 1,
      user_id: req.body.user_id,
      title: req.body.title,
      propdate: req.body.propdate.toString(),
      dateposted: moment().format("MMMM Do YYYY"),
      eventfee: req.body.eventfee,
      duration: req.body.duration,
      description: req.body.description,
      tags: req.body.tags,
      category: req.body.category,
      college: req.body.college,
      location: req.body.location
    });
    event
      .save()
      .then(result => {
        res.json({
          success: true,
          message: "Event successfully created, It will be live once approved."
        });
      })
      .catch(err => {
        res.json({ success: false, message: "Something went wrong!" });
        console.log(err);
      });
  });
});

//UPLOAD IMAGE
const upload = require("./multer");

const singleUpload = upload.single("image");

router.post("/uploadimage/:id", (req, res) => {
  var id = req.params.id;

  singleUpload(req, res, (err, some) => {
    if (err) {
      return res.json({
        msg: "Image Upload Error",
        detail: err.message
      });
    } else {
      Event.updateOne(
        { event_id: id },
        { $set: { image: req.file.location } },
        (err, user) => {
          if (err) {
            console.log(err);
            return res.json({ success: false, msg: "Failed to upload photo" });
          } else {
            console.log("user changed");

            return res.json({
              success: true,
              msg: "Details updated:" + req.file.location
            });
          }
        }
      );
    }
  });
});
//UPLOAD IMAGE END

//LIKE/DISLIKE EVENT

router.post("/reaction", (req, response) => {
  var action = req.body.action;
  var id = req.body.event_id;
  Event.findOne({ event_id: id }, (err, res) => {
    var count = res.likes;
    if (action == "like") {
      count++;
    } else if (action == "dislike" && count != 0) {
      count--;
    }
    console.log(count);

    Event.updateOne({ event_id: id }, { $set: { likes: count } }, (err, cb) => {
      if (err) {
        response.json({ success: false, error: err });
      }
      response.json({ success: true, msg: "action successfull" });
    });
  });
});

//get all the events
router.get("/eventlist", (req, res) => {
  Event.find((err, result) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, events: result });
  });
});

//get events based on user's interest
router.get("/user_interest_events", (req, res) => {
  const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 10
  });

  Event.find((err, result) => {
    if (err) {
      console.log(err);
    }
  });
  const processedDocuments = result.map(item => ({
    id: item.event_id,
    content: item.description
  }));

  recommender.train(processedDocuments);

  const similarEvents = recommender.getSimilarDocuments(4, 0, 5);
  console.log(similarEvents);
  var final_list = [];
  similarEvents.forEach(sevent => {
    result.forEach(e => {
      if (e.event_id == sevent.id) {
        final_list.push(e);
      }
    });
  });
  console.log(final_list);

  //    res.json({ success: true, events: result });
});

//APPROVE OR UNAPPROVE
router.put("/eventupdate", (req, res) => {
  const action = req.body.action;
  const event_id = req.body.event_id;
  Event.updateOne(
    { event_id: event_id },
    { $set: { status: action } },
    (err, result) => {
      if (err) {
        res.json({ success: false, msg: "something went wrong" });
      } else {
        res.json({ success: true, msg: "It worked" });
      }
    }
  );
});

//DELETE EVENT
router.delete("/eventdelete/:id", (req, res) => {
  const event_id = req.params.id;
  console.log(event_id);

  Event.deleteOne({ event_id: event_id }, err => {
    if (!err) {
      res.json({ success: true, msg: "Event Deleted" });
    } else {
      res.json({ success: false, msg: "Something went wrong" });
    }
  });
});

module.exports = router;
