const express = require("express");
const router = express.Router();
const clientDetailsAnnouncementController = require("../controllers/clientDetailsAnnouncementController");

router.get(
  "/client-details-announcement",
  clientDetailsAnnouncementController.getClientDetailsAnnouncement
);

module.exports = router;
