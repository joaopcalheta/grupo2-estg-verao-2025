// server/routes/homeRoute.js

const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.getHome); // renderiza a página 

module.exports = router;
