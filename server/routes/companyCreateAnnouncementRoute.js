const express = require("express");
const router = express.Router();
const companyCreateAnnouncementController = require("../controllers/companyCreateAnnouncementController");

router.get(
  "/company-create-announcement",
  companyCreateAnnouncementController.getCompanyCreateAnnouncement
);

module.exports = router;
