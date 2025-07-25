const express = require("express");
const router = express.Router();
const companyManageAnnouncementController = require("../controllers/companyManageAnnouncementController");

router.get(
  "/company-manage-announcement",
  companyManageAnnouncementController.getCompanyManageAnnouncement
);

module.exports = router;
