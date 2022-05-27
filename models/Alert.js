const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const alertSchema = new Schema({
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  accuracy: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  room: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Alert", alertSchema);
