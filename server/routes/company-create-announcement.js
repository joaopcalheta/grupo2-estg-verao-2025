// routes/companyCreateAnnouncementRoute.js

const express = require("express");
const router = express.Router();
const companyCreateAnnouncementController = require("../controllers/company-create-announcement");

router.get(
  "/company-create-announcement/:companyID",
  companyCreateAnnouncementController.getCompanyCreateAnnouncement
); // renderiza a página

router.post(
  "/company-create-announcement/:companyID",
  companyCreateAnnouncementController.postCompanyCreateAnnouncement
);

module.exports = router;
