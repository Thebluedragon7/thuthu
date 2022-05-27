const homePage = "../views/homePage.ejs";
const { v4: uuidV4 } = require("uuid");
const newAlert = require("./alertController");

const createAlert = async (req, res, next) => {
  console.log(req.body);
  newAlert(req.body);
  res.render(homePage, {
    authStatus:
      '<span class="alert-success">Alerted Bluedragon Successfully!</span>',
    roomID: req.body.room,
  });
};

const redirectToVideo = async (req, res, next) => {
  res.redirect(`/${uuidV4()}`);
};

const connectVideo = async (req, res, next) => {
  res.render(homePage, {
    roomID: req.params.room,
    authStatus: "",
  });
};

exports.redirectToVideo = redirectToVideo;
exports.connectVideo = connectVideo;
exports.createAlert = createAlert;
