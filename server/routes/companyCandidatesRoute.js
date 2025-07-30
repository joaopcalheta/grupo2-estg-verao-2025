const express = require("express");
const router = express.Router();
const companyCandidatesController = require("../controllers/companyCandidatesController");

router.get(
  "/company-candidates",
  companyCandidatesController.getCompanyCandidates
); // renderiza a página 

module.exports = router;
