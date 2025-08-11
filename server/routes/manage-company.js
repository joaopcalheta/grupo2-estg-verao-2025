// ../routes/manage-company.js

const express = require("express");
const router = express.Router();
const editCompanyController = require("../controllers/manage-company");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get(
  "/manage-company/:id",
  ensureAuthenticated,
  editCompanyController.getEditCompany
); // página
router.post(
  "/manage-company/:id",
  ensureAuthenticated, upload.single("pic"),
  editCompanyController.postEditCompany
); // formulário
router.delete(
  "/manage-company/:companyId",
  ensureAuthenticated,
  editCompanyController.deleteCompany
); // apgar empresa

module.exports = router;
