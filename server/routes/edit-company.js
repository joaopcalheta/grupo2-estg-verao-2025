const express = require("express");
const router = express.Router();
const editCompanyController = require("../controllers/edit-company");

router.get("/edit-company", editCompanyController.getEditCompany); // renderiza a página
router.post("/edit-company", editCompanyController.postEditCompany);

module.exports = router;
