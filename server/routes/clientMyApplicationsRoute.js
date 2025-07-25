const express = require("express");
const router = express.Router();
const clientMyApplicationsController = require("../controllers/clientMyApplicationsController");

router.get(
  "/client-my-applications",
  clientMyApplicationsController.getClientMyApplications
);

module.exports = router;
