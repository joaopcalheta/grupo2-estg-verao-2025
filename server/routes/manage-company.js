// ../routes/manage-company.js

const express = require("express");
const router = express.Router();
const editCompanyController = require("../controllers/manage-company");

router.get("/manage-company", editCompanyController.getEditCompany); // página
router.post("/manage-company", editCompanyController.postEditCompany); // formulário

module.exports = router;
