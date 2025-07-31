const express = require("express");
const router = express.Router();
const clientMyProfileController = require("../controllers/clientMyProfileController");

router.get("/client-my-profile",
  clientMyProfileController.getClientMyProfile
); // renderiza a página 

router.post("/client-my-profile",
  clientMyProfileController.postClientMyProfile
);

module.exports = router;
