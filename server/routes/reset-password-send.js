const express = require("express");
const router = express.Router();
const resetPasswordSendController = require("../controllers/reset-password-send");

router.get(
  "/reset-password-send",
  resetPasswordSendController.getResetPasswordSend
); // renderiza a página 

module.exports = router;
