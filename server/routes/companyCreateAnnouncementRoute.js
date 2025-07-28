// routes/companyCreateAnnouncementRoute.js

const express = require("express");
const router = express.Router();
const companyCreateAnnouncementController = require("../controllers/companyCreateAnnouncementController");

router.get(
  "/company-create-announcement",
  companyCreateAnnouncementController.getCompanyCreateAnnouncement
);

router.post(
  "/company-create-announcement",
  companyCreateAnnouncementController.postCompanyCreateAnnouncement
);

module.exports = router;
