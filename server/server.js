// ../server.js

const express = require("express"); // framework express
const http = require("http");
const path = require("path");
const expressLayouts = require("express-ejs-layouts"); // para usar layout automatico com footer, head e header
const mongoose = require("mongoose"); // ODM para MongoDB
require("dotenv").config(); // carrega variáveis de ambiente do ficheiro .env
const app = express(); // inicializa a aplicação Express
const PORT = process.env.PORT || 3000; // porta do servidor
const methodOverride = require("method-override"); // para simular PUT e DELETE
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const plainPassword = "password123";

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  // guarda o hash na base de dados no campo password
});

app.set("view engine", "ejs"); // define EJS como motor de views
app.set("views", path.join(__dirname, "..", "client", "views")); // pasta onde estão as views

// configuração do passport
const initializePassport = require("./configs/passportConfig");
initializePassport(passport);

app.use(express.static(path.join(__dirname, "..", "client", "public"))); // CSS, imagens, js
app.use("/qrcodes", express.static(path.join(__dirname, "public", "qrcodes"))); // pasta para os QR Codes
app.use(express.urlencoded({ extended: true })); // para ler dados de formulários (POST)
app.use(express.json());
app.use(expressLayouts);
// middleware que permite que formulários HTML simulem requisições PUT e DELETE (útil porque o HTML padrão só suporta GET e POST: input type="hidden" name="_method" value="DELETE"> fará um DELETE em vez de POST)
// mais info -> https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride("_method"));

// sessão
app.use(
  session({
    secret: "segredo_muito_seguro", // deveria ser algo complexo mas para desenvolvimento vai ficar assim
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// upload das imagens
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// importa as rotas
const routes = [
  "apagar_company-my-profile",
  "company-announcement-candidates",
  "company-create-announcement",
  "company-details-announcement",
  "company-details-candidate",
  "company-manage-announcement",
  "company-my-announcements",
  "create-company",
  "manage-company",
  "home-details-announcement",
  "home",
  "login",
  "settings",
  "reset-password-send",
  "reset-password",
  "search-filter",
  "submit-application",
  "print-announcement",
];

routes.forEach((route) => {
  app.use(require(`./routes/${route}`));
});

// cria o servidor HTTP
const server = http.createServer(app);

// inicia o servidor
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });
