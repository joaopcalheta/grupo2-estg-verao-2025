const express = require("express");
const router = express.Router();
const createCompanyController = require("../controllers/create-company");

router.get("/create-company", createCompanyController.getCreateCompany); // renderiza a página

module.exports = router;
