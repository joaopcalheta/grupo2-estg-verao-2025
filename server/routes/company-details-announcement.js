const express = require("express");
const router = express.Router();
const companyDetailsAnnouncementController = require("../controllers/company-details-announcement");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get(
  "/company-details-announcement", ensureAuthenticated,
  companyDetailsAnnouncementController.getCompanyDetailsAnnouncement
); // renderiza a página 

module.exports = router;
