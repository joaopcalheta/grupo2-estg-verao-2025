const express = require("express");
const router = express.Router();
const companyDetailsAnnouncementController = require("../controllers/company-details-announcement");

router.get(
  "/company-details-announcement",
  companyDetailsAnnouncementController.getCompanyDetailsAnnouncement
); // renderiza a página 

module.exports = router;
