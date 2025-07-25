const express = require("express");
const router = express.Router();
const submitController = require("../controllers/submitController");

router.get("/submit", submitController.getsubmit);

module.exports = router;
