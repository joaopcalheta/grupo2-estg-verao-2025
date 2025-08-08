const express = require("express");
const router = express.Router();
const { printAnnouncementPdf } = require("../controllers/printAnnouncement");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get(
  "/print-announcement/:id",
  ensureAuthenticated,
  printAnnouncementPdf
);

module.exports = router;
