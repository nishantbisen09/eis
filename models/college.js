const mongoose = require("mongoose");

const collegeSchema = mongoose.Schema({
  collegeName: String,
  collegeEmail: String,
  collegeAddress: String,
  collegeContact: String,
  collegeCity: String,
  collegeRNumber: String,
  collegeStatus: { type: String, default: "unapproved" },
  user_id: Number
});

module.exports = mongoose.model("College", collegeSchema);
