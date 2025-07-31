const express = require("express");
const router = express.Router();
const clientProfessionalDataController = require("../controllers/clientProfessionalDataController");

router.get("/client-professional-data",
  clientProfessionalDataController.getProfessionalDataPage
); // renderiza a página 

router.put("/client-professional-data",
  clientProfessionalDataController.updateProfessionalData
);

module.exports = router;