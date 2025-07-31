const express = require("express");
const router = express.Router();
const clientProfessionalDataController = require("../controllers/clientProfessionalDataController");

router.get("/client-professional-data",
  clientProfessionalDataController.getClientProfessionalData
); // renderiza a página 

router.post("/client-professional-data",
  clientProfessionalDataController.postClientProfessionalData
);

module.exports = router;