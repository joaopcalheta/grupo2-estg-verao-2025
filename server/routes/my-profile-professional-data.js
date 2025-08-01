const express = require("express");
const router = express.Router();
const myProfileProfessionalDataController = require("../controllers/my-profile-professional-data");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get(
  "/my-profile-professional-data", ensureAuthenticated,
  myProfileProfessionalDataController.getMyProfileProfessionalData
); // renderiza a página

router.post(
  "/my-profile-professional-data", ensureAuthenticated,
  myProfileProfessionalDataController.postUpdateProfessionalData
)

module.exports = router;
