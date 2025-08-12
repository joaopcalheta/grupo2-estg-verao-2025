// routes/companyCreateAnnouncementRoute.js

const express = require("express");
const router = express.Router();


const companyCreateAnnouncementController = require("../controllers/company-create-announcement");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get(
  "/company-create-announcement/:companyID", ensureAuthenticated,
  companyCreateAnnouncementController.getCompanyCreateAnnouncement
); // renderiza a página

router.post(
  "/company-create-announcement/:companyID", ensureAuthenticated,
  upload.single("pic"), // middleware para upload de ficheiros
  companyCreateAnnouncementController.postCompanyCreateAnnouncement
);

module.exports = router;
