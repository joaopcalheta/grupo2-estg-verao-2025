const express = require("express");
const router = express.Router();
const companyDetailsCandidateController = require("../controllers/company-details-candidate");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get(
  "/company-details-candidate", ensureAuthenticated,
  companyDetailsCandidateController.getCompanyDetailsCandidate
); // renderiza a página 

module.exports = router;
