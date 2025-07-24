const express = require("express");
const router = express.Router();
const myAdsController = require("../controllers/myAdsController");

router.get("/myAds", myAdsController.getMyAds);

module.exports = router;
