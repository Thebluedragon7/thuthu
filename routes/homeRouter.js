const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.redirectToVideo);

router.post("/", homeController.createAlert);

router.get("/:room", homeController.connectVideo);

module.exports = router;
