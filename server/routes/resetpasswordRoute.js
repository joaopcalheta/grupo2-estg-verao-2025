const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");

router.get("/reset-password", resetPasswordController.getResetPassword); // renderiza a página 

module.exports = router;
