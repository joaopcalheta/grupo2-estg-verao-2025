// ../routes/manage-company.js

const express = require("express");
const router = express.Router();
const editCompanyController = require("../controllers/manage-company");

router.get("/manage-company/:id", editCompanyController.getEditCompany); // página
router.post("/manage-company/:id", editCompanyController.postEditCompany); // formulário

module.exports = router;
