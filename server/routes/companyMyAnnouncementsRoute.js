const express = require("express");
const router = express.Router();
const companyMyAnnouncementsController = require("../controllers/companyMyAnnouncementsController");

router.get(
  "/company-my-announcements",
  companyMyAnnouncementsController.getCompanyMyAnnouncements
);

module.exports = router;
