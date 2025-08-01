// routes/companyCreateAnnouncementRoute.js

const express = require("express");
const router = express.Router();
const companyCreateAnnouncementController = require("../controllers/company-create-announcement");

router.get(
  "/company-create-announcement",
  companyCreateAnnouncementController.getCompanyCreateAnnouncement
); // renderiza a página 

router.post(
  "/company-create-announcement",
  companyCreateAnnouncementController.postCompanyCreateAnnouncement
);

module.exports = router;
