const express = require("express");
const router = express.Router();
const createAdController = require("../controllers/createAdController");

router.get("/createAd", createAdController.getCreateAd);

module.exports = router;
