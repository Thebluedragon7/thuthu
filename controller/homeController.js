const homePage = "../views/homePage.ejs";
const { v4: uuidV4 } = require("uuid");
const newAlert = require("./alertController");

const CODE = "thuthu";

function isValidCode(bodyData) {
  let auth_code = bodyData.bluecode;
  if (auth_code !== CODE) {
    // Wrong Code
    return false;
  }
  return true;
}

const createAlert = async (req, res, next) => {
  let locationEnabled = false;
  console.log(req.body);
  if (isValidCode(req.body)) {
    newAlert(req.body);
    res.render(homePage, {
      authStatus:
        '<span class="alert-success">Alerted Bluedragon Successfully!</span>',
    });
  } else {
    res.render(homePage, {
      authStatus: '<span class="alert-danger">Incorrect Code</span>',
    });
  }
};

const redirectToVideo = async (req, res, next) => {
  res.redirect(`/${uuidV4()}`);
};

const connectVideo = async (req, res, next) => {
  res.render(homePage, {
    roomID: req.params.room,
    authStatus: "Alert Blue Dragon",
  });
};

exports.redirectToVideo = redirectToVideo;
exports.connectVideo = connectVideo;
exports.createAlert = createAlert;
