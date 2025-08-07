const express = require("express");
const router = express.Router();
const companyAnnouncementCandidatesController = require("../controllers/company-announcement-candidates");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get(
  "/company-announcement-candidates", ensureAuthenticated,
  companyAnnouncementCandidatesController.getCompanyAnnouncementCandidates
); // renderiza a página 

module.exports = router;
