const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/reset-password");

router.get("/reset-password", resetPasswordController.getResetPassword); // renderiza a página 

module.exports = router;
