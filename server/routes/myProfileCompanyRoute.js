const express = require("express");
const router = express.Router();
const manageMyProfileCompanyController = require("../controllers/myProfileCompanyController");

// rota GET //
router.get("/", manageMyProfileCompanyController.getMyProfileCompany);

module.exports = router;