const express = require("express");
const router = express.Router();
const searchFilterController = require("../controllers/search-filter");

router.get("/search-filter", searchFilterController.getSearchFilter); // renderiza a página 

module.exports = router;
