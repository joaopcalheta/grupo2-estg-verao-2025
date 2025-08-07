// ../routes/settings.js

const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings");
const myAccountController = require("../controllers/settings/my-account");
const professionalProfileController = require("../controllers/settings/professional-profile");
const myApplicationsController = require("../controllers/settings/my-applications");
const myCompaniesController = require("../controllers/settings/my-companies");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/settings", ensureAuthenticated, settingsController.getSettingsPage);

// my account
router.get("/my-account", ensureAuthenticated, myAccountController.getMyAccountPage);
router.post("/my-account", ensureAuthenticated, myAccountController.postMyAccountData);

// professional profile
router.get(
  "/professional-profile", ensureAuthenticated, 
  professionalProfileController.getProfessionalProfilePage
);
router.post(
  "/professional-profile", ensureAuthenticated,
  professionalProfileController.postProfessionalProfileData
);

// my applications
router.get("/my-applications", ensureAuthenticated, myApplicationsController.getMyApplicationsPage);
router.delete("/my-applications/:id", ensureAuthenticated, myApplicationsController.deleteApplication);
router.delete("/my-applications/delete/:id", ensureAuthenticated, myApplicationsController.deleteApplication);

// my companies
router.get("/my-companies", ensureAuthenticated, myCompaniesController.getMyCompaniesPage);

module.exports = router;
