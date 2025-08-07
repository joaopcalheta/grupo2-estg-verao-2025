// ../routes/company-my-announcements.js

const express = require("express");
const router = express.Router();
const companyMyAnnouncementsController = require("../controllers/company-my-announcements");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get(
  "/company-my-announcements", ensureAuthenticated,
  companyMyAnnouncementsController.getCompanyMyAnnouncements
); // renderiza a página

router.get(
  "/company-my-announcements/:companyID", ensureAuthenticated,
  companyMyAnnouncementsController.getCompanyMyAnnouncements
); // renderiza os anúncios da empresa específica

module.exports = router;
