const express = require ("express");
const router = express.Router();
const myAdsController = require("../controllers/myAdsController");

router.get("/", myAdsController.getMyAds);

module.exports = router;