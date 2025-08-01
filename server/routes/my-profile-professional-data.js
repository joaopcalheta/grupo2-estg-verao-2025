const express = require("express");
const router = express.Router();
const myProfileProfessionalDataController = require("../controllers/my-profile-professional-data");

router.get(
  "/my-profile-professional-data",
  myProfileProfessionalDataController.getMyProfileProfessionalData
); // renderiza a página

router.post(
  "/my-profile-professional-data",
  myProfileProfessionalDataController.updateProfessionalData
);

module.exports = router;
