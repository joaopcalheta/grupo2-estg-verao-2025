const express = require("express");
const router = express.Router();
const myAdsController = require("../controllers/myAdsController");

router.get("/myAdsRoute", myAdsController.getMyAds);

module.exports = router;
