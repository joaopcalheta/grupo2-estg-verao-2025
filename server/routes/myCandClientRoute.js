const express = require("express");
const router = express.Router();
const manageMyCandClientController = require("../controllers/myCandClientController");

// rota GET //
router.get("/", manageMyCandClientController.getMyCandClient);

module.exports = router;