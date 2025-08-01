const express = require("express");
const router = express.Router();
const clientMyProfileController = require("../controllers/clientMyProfileController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/client-my-profile", ensureAuthenticated,
  clientMyProfileController.getClientMyProfile
); // renderiza a página 

router.post("/client-my-profile/data", ensureAuthenticated,
  clientMyProfileController.updatePersonalData
);

router.put("/client-my-profile/password", ensureAuthenticated,
  clientMyProfileController.updatePassword
);


module.exports = router;
