const express = require("express");
const router = express.Router();
const clientSubmitController = require("../controllers/clientSubmitController");

router.get("/client-submit", clientSubmitController.getClientSubmit);

module.exports = router;
