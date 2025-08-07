// ../routes/company-manage-announcement.js

const express = require("express");
const router = express.Router();
const companyManageAnnouncementController = require("../controllers/company-manage-announcement");

router.get(
  "/company-manage-announcement/:announcementID",
  companyManageAnnouncementController.getCompanyManageAnnouncement
); // renderiza a página

router.post(
  "/company-manage-announcement/:announcementID",
  companyManageAnnouncementController.updateCompanyAnnouncement
);
router.delete(
  "/company-manage-announcement/:announcementID",
  companyManageAnnouncementController.deleteCompanyAnnouncement
);

module.exports = router;
