const express = require("express");
const router = express.Router();
const homeDetailsAnnouncementController = require("../controllers/home-details-announcement");

router.get(
  "/home-details-announcement",
  homeDetailsAnnouncementController.getHomeDetailsAnnouncement
); // renderiza a página 

module.exports = router;
