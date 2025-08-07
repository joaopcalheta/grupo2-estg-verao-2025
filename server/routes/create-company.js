// ../routes/create-company.js
const express = require("express");
const router = express.Router();
const createCompanyController = require("../controllers/create-company");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/create-company", ensureAuthenticated, createCompanyController.getCreateCompany); // renderiza a página
router.post("/create-company", ensureAuthenticated, createCompanyController.postCreateCompany);

module.exports = router;
