const express = require("express");
const router = express.Router();
const myProfileMyApplicationsController = require("../controllers/my-profile-my-applications");

router.get(
  "/my-profile-my-applications",
  myProfileMyApplicationsController.getMyProfileMyApplications
); // renderiza a página 

module.exports = router;
