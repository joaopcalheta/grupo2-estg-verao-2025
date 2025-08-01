const express = require("express");
const router = express.Router();
const myProfilePersonalDataController = require("../controllers/my-profile-personal-data");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/my-profile-personal-data", ensureAuthenticated,
  myProfilePersonalDataController.getMyProfilePersonalData
); // renderiza a página 

router.put("/my-profile-personal-data/data", ensureAuthenticated,
  myProfilePersonalDataController.updatePersonalData
);

router.put("/my-profile-personal-data/password", ensureAuthenticated,
  myProfilePersonalDataController.updatePassword
);


module.exports = router;
