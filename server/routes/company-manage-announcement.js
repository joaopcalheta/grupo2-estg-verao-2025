// ../routes/company-manage-announcement.js

const express = require("express");
const router = express.Router();
const companyManageAnnouncementController = require("../controllers/company-manage-announcement");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get(
  "/company-manage-announcement/:announcementID", ensureAuthenticated,
  companyManageAnnouncementController.getCompanyManageAnnouncement
); // renderiza a página

router.post(
  "/company-manage-announcement/:announcementID", ensureAuthenticated, upload.single("pic"),
  companyManageAnnouncementController.updateCompanyAnnouncement
);
router.delete(
  "/company-manage-announcement/:announcementID", ensureAuthenticated,
  companyManageAnnouncementController.deleteCompanyAnnouncement
);

module.exports = router;
