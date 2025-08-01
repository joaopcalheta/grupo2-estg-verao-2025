const express = require("express");
const router = express.Router();
const apagarCompanyMyProfileController = require("../controllers/apagar_company-my-profile");

router.get(
  "/apagar_company-my-profile",
  apagarCompanyMyProfileController.getApagarCompanyMyProfile
); // renderiza a página 

module.exports = router;
