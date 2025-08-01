// server/routes/my-companies

const express = require("express");
const router = express.Router();
const myProfileMyCompaniesController = require("../controllers/my-profile-my-companies");

router.get("/my-profile-my-companies", myProfileMyCompaniesController.getMyProfileMyCompanies); // renderiza a página

module.exports = router;
