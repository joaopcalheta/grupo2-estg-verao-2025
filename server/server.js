// server/server.js

const express = require("express"); // framework web
const http = require("http"); // módulo HTTP do Node.js
const path = require("path"); // para lidar com caminhos de ficheiros
const expressLayouts = require("express-ejs-layouts"); // plugin para usar um layout base com EJS
const mongoose = require("mongoose"); // ODM para MongoDB
require("dotenv").config(); // carrega variáveis de ambiente do ficheiro .env
const app = express(); // inicializa a aplicação Express
const PORT = process.env.PORT || 3000; // porta do servidor (usa 3000 se não houver variável de ambiente)
const methodOverride = require("method-override"); // para simular PUT e DELETE

//login
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");

//-------------------------------------------------------------
// coiso da password segura
const saltRounds = 10;
const plainPassword = "password123";

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  // guarda o hash na base de dados no campo password
});
//-----------------------------------------------------------

// configuração do motor de templates EJS
app.set("view engine", "ejs"); // define EJS como motor de views
app.set("views", path.join(__dirname, "..", "client", "views")); // define a pasta onde estão as views

// configuração do passport
const initializePassport = require("./configs/passportConfig");
initializePassport(passport);

// middlewares
app.use(express.static(path.join(__dirname, "..", "client", "public"))); // serve ficheiros estáticos (CSS, imagens)
app.use(express.urlencoded({ extended: true })); // para ler dados de formulários (POST)
app.use(expressLayouts); // usa layouts com EJS
// middleware que permite que formulários HTML simulem requisições PUT e DELETE (útil porque o HTML padrão só suporta GET e POST: input type="hidden" name="_method" value="DELETE"> fará um DELETE em vez de POST)
// mais info -> https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride("_method"));

// sessão
app.use(
  session({
    secret: "segredo_muito_seguro",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// middleware que passa o utilizador logado para todas as views - atraves do express-layouts
// Middleware para mensagens flash e utilizador logado
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// importa as rotas
const routes = [
  "apagar_company-my-profile",
  "company-announcement-candidates",
  "company-create-announcement",
  "company-details-announcement",
  "company-details-candidate",
  "company-manage-announcement",
  "company-my-announcements",
  "home-details-announcement",
  "home",
  "login",
  "my-profile-my-applications",
  "my-profile-my-companies",
  "my-profile-personal-data",
  "my-profile-professional-data",
  "reset-password-send",
  "reset-password",
  "search-filter",
  "submit-application",
];

routes.forEach((route) => {
  app.use(require(`./routes/${route}`));
});

// cria o servidor HTTP
const server = http.createServer(app);

// inicia o servidor
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // Mostra que o servidor está ativo
});

// mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });
