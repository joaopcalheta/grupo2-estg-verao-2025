const express = require("express");
const router = express.Router();
const manageAdController = require("../controllers/manageAdController");

// rota GET //
router.get("/manageAd", manageAdController.getManageAd);

module.exports = router;