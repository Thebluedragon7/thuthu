const Alert = require("../models/Alert");

const newAlert = async (data) => {
  latitude = data.latitude;
  longitude = data.longitude;
  accuracy = data.accuracy;
  room = data.room;
  let alert = new Alert({
    latitude: latitude,
    longitude: longitude,
    accuracy: accuracy,
    room: room,
  });

  alert = await alert.save();

  if (!alert) {
    return res.status(500).json({
      message: "Cannot send an Alert",
    });
    next();
  }
};

module.exports = newAlert;
