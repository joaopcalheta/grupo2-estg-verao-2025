// ../routes/company-my-announcements.js

const express = require("express");
const router = express.Router();
const companyMyAnnouncementsController = require("../controllers/company-my-announcements");

router.get(
  "/company-my-announcements",
  companyMyAnnouncementsController.getCompanyMyAnnouncements
); // renderiza a página

router.get(
  "/company-my-announcements/:companyID",
  companyMyAnnouncementsController.getCompanyMyAnnouncements
); // renderiza os anúncios da empresa específica

module.exports = router;
