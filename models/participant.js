const mongoose = require("mongoose");
const config = require("../config/database");

const participantSchema = mongoose.Schema({
  name: { type: String, required: true },
  event_id: { type: Number, required: true },
  event_title: { type: String, required: true },
  event_propdate: { type: String, required: true },
  user_id: Number,
  college: { type: String, required: true },
  contact: { type: String, required: true },
  payment_status: { type: String, required: true, default: "pending" },
  payment_mode: { type: String },
  date_participated: { type: String, required: true }
});

module.exports = mongoose.model("Participant", participantSchema);
