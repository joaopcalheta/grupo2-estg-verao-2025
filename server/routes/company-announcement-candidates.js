const express = require("express");
const router = express.Router();
const companyAnnouncementCandidatesController = require("../controllers/company-announcement-candidates");

router.get(
  "/company-announcement-candidates",
  companyAnnouncementCandidatesController.getCompanyAnnouncementCandidates
); // renderiza a página 

module.exports = router;
