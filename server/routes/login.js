// server/routes/loginRoute.js

const loginController = require("../controllers/login");
const express = require("express");
const router = express.Router();

router.get("/login", loginController.getLogin); // renderiza a página 
router.post("/login", loginController.postLogin); // login
router.get("/logout", loginController.logout); // logout
router.post("/register", loginController.register); // registo

module.exports = router;
