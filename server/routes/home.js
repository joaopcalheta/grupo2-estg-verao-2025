// server/routes/homeRoute.js

const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");

router.get("/", homeController.getHome); // renderiza a página 

module.exports = router;
