const mongoose = require("mongoose");
const config = require("../config/database");

const eventSchema = mongoose.Schema({
  event_id: { type: Number },
  user_id: { type: Number },
  title: { type: String, required: true },
  propdate: { type: String, required: true },
  dateposted: { type: String, required: true },
  eventfee: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: String, required: true },
  college: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, require: true },
  image: { type: String },
  status: { type: String, default: "unapproved" },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model("Event", eventSchema);
