const express = require("express");
const router = express.Router();
const companyMyProfileController = require("../controllers/companyMyProfileController");

router.get(
  "/company-my-profile",
  companyMyProfileController.getCompanyMyProfile
);

module.exports = router;
