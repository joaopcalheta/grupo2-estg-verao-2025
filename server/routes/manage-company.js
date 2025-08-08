// ../routes/manage-company.js

const express = require("express");
const router = express.Router();
const editCompanyController = require("../controllers/manage-company");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/manage-company/:id", ensureAuthenticated, editCompanyController.getEditCompany); // página
router.post("/manage-company/:id", ensureAuthenticated, editCompanyController.postEditCompany); // formulário
router.delete("/manage-company", ensureAuthenticated, editCompanyController.deleteCompany);

module.exports = router;
