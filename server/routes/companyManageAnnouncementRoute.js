const express = require("express");
const router = express.Router();
const companyManageAnnouncementController = require("../controllers/companyManageAnnouncementController");

router.get(
  "/company-manage-announcement",
  companyManageAnnouncementController.getCompanyManageAnnouncement
); // renderiza a página 

router.post(
  "/company-manage-announcement",
  companyManageAnnouncementController.updateCompanyAnnouncement
);
router.delete(
  "/company-manage-announcement",
  companyManageAnnouncementController.deleteCompanyAnnouncement
);


module.exports = router;

