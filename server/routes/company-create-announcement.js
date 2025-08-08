// routes/companyCreateAnnouncementRoute.js

const express = require("express");
const router = express.Router();
const companyCreateAnnouncementController = require("../controllers/company-create-announcement");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get(
  "/company-create-announcement/:companyID", ensureAuthenticated,
  companyCreateAnnouncementController.getCompanyCreateAnnouncement
); // renderiza a página

router.post(
  "/company-create-announcement/:companyID", ensureAuthenticated,
  companyCreateAnnouncementController.postCompanyCreateAnnouncement
);

module.exports = router;
