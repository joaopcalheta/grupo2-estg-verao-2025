const express = require("express");
const router = express.Router();
const companyDetailsCandidateController = require("../controllers/company-details-candidate");

router.get(
  "/company-details-candidate",
  companyDetailsCandidateController.getCompanyDetailsCandidate
); // renderiza a página 

module.exports = router;
