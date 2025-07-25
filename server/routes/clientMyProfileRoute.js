const express = require("express");
const router = express.Router();
const clientMyProfileController = require("../controllers/clientMyProfileController");

router.get("/client-my-profile", clientMyProfileController.getClientMyProfile);

module.exports = router;
