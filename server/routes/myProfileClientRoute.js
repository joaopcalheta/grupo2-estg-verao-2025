const express = require("express");
const router = express.Router();
const manageMyProfileClientController = require("../controllers/myProfileClientController");

// rota GET //
router.get(
  "/myProfileClient",
  manageMyProfileClientController.getMyProfileClient
);

module.exports = router;
