const express = require("express");
const router = express.Router();
const manageMyProfileClientController = require("../controllers/myProfileClientController");

// rota GET //
router.get("/", manageMyProfileClientController.getMyProfileClient);

module.exports = router;