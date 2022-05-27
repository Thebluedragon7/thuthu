const homePage = "../views/homePage.html";
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

const getHome = async (req, res, next) => {
  res.render(homePage, {
    locals: { authStatus: "Alert Blue Dragon" },
  });
};

const createAlert = async (req, res, next) => {
  let locationEnabled = false;
  console.log(req.body);
  if (isValidCode(req.body)) {
    newAlert(req.body);
    res.render(homePage, {
      locals: {
        authStatus:
          '<span class="alert-success">Alerted Bluedragon Successfully!</span>',
      },
    });
  } else {
    res.render(homePage, {
      locals: {
        authStatus: '<span class="alert-danger">Incorrect Code</span>',
      },
    });
  }
};

exports.getHome = getHome;
exports.createAlert = createAlert;
