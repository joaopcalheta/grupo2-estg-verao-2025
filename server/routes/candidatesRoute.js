const express = require("express");
const router = express.Router();
const candidatesController = require("../controllers/candidatesController");

router.get("/candidates", candidatesController.getCandidates);

module.exports = router;
