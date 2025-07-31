// server/routes/my-companies

const express = require("express");
const router = express.Router();
const myCompaniesController = require("../controllers/my-companies");

router.get("/my-companies", myCompaniesController.getMyCompanies); // renderiza a página

module.exports = router;
