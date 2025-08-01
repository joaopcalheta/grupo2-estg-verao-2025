const express = require("express");
const router = express.Router();
const myProfilePersonalDataController = require("../controllers/my-profile-personal-data");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/my-profile-personal-data", ensureAuthenticated,
  myProfilePersonalDataController.getMyProfilePersonalData
); // renderiza a página 

router.post("/my-profile-personal-data",  ensureAuthenticated,
  myProfilePersonalDataController.postUpdatePersonalData
);


module.exports = router;
