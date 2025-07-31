const express = require("express");
const router = express.Router();
const myProfileProfessionalController = require("../controllers/my-profile-professional");

router.get(
  "/my-profile-professional",
  myProfileProfessionalController.getMyProfileProfessional
); // renderiza a página

router.post(
  "/my-profile-professional",
  myProfileProfessionalController.postMyProfileProfessional
);

module.exports = router;
