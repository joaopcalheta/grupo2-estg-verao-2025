// routes/clientSubmitRoute.js

const express = require("express");
const router = express.Router();
const submitApplicationController = require("../controllers/submit-application");

router.get("/submit-application", 
    submitApplicationController.getSubmitApplication
); // renderiza a página 

router.post("/submit-application", 
    submitApplicationController.postSubmitApplication
);

module.exports = router;
