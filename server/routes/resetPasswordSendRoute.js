const express = require("express");
const router = express.Router();
const resetPasswordSendController = require("../controllers/resetPasswordSendController");

router.get(
  "/reset-password-send",
  resetPasswordSendController.getResetPasswordSend
);

module.exports = router;
