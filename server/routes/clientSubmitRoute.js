// routes/clientSubmitRoute.js

const express = require("express");
const router = express.Router();
const clientSubmitController = require("../controllers/clientSubmitController");

router.get("/client-submit", 
    clientSubmitController.getClientSubmitApplication
); // renderiza a página 

router.post("/client-submit", 
    clientSubmitController.postClientSubmitApplication
);

module.exports = router;
