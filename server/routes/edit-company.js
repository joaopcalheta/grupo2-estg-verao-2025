const express = require("express");
const router = express.Router();
const editCompanyController = require("../controllers/edit-company");

router.get("/edit-company/:id", editCompanyController.getEditCompany); // renderiza a página
router.post("/edit-company/:id", editCompanyController.postEditCompany);

module.exports = router;
