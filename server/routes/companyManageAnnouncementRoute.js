const express = require("express");
const router = express.Router();
const companyManageAnnouncementController = require("../controllers/companyManageAnnouncementController");

router.get(
  "/company-manage-announcement",
  companyManageAnnouncementController.getCompanyManageAnnouncement
);

router.post(
  "/company-manage-announcement",
  companyManageAnnouncementController.updateCompanyAnnouncement
);

module.exports = router;
