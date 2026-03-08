const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  type: String,
  distance: Number,
  carbon: Number,
});

module.exports = mongoose.model("Activity", ActivitySchema);