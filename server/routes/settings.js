// ../routes/settings.js

const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings");
const myAccountController = require("../controllers/settings/my-account");
const professionalProfileController = require("../controllers/settings/professional-profile");
const myApplicationsController = require("../controllers/settings/my-applications");
const myCompaniesController = require("../controllers/settings/my-companies");

router.get("/settings", settingsController.getSettingsPage);

// my account
router.get("/my-account", myAccountController.getMyAccountPage);
router.post("/my-account", myAccountController.postMyAccountData);

// professional profile
router.get(
  "/professional-profile",
  professionalProfileController.getProfessionalProfilePage
);
router.post(
  "/professional-profile",
  professionalProfileController.postProfessionalProfileData
);

// my applications
router.get("/my-applications", myApplicationsController.getMyApplicationsPage);

// my companies
router.get("/my-companies", myCompaniesController.getMyCompaniesPage);

module.exports = router;
