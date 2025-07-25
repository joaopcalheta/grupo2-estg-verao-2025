const express = require("express");
const router = express.Router();
const resetpasswordController = require("../controllers/resetpasswordController");

router.get("/resetpassword", resetpasswordController.getresetpassword);

module.exports = router;
