const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.getHome);

router.post("/", homeController.createAlert);

module.exports = router;
