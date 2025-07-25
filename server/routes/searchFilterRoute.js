const express = require("express");
const router = express.Router();
const searchFilterController = require("../controllers/searchFilterController");

router.get("/search-filter", searchFilterController.getSearchFilter);

module.exports = router;
