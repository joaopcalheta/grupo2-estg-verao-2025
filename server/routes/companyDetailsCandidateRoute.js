const express = require("express");
const router = express.Router();
const companyDetailsCandidateController = require("../controllers/companyDetailsCandidateController");

router.get(
  "/company-details-candidate",
  companyDetailsCandidateController.getCompanyDetailsCandidate
);

module.exports = router;
