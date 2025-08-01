const express = require("express");
const router = express.Router();
const companyMyAnnouncementsController = require("../controllers/company-my-announcements");

router.get(
  "/company-my-announcements",
  companyMyAnnouncementsController.getCompanyMyAnnouncements
); // renderiza a página 

module.exports = router;
