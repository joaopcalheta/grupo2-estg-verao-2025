const express = require("express"); // framework web
const http = require("http"); // módulo HTTP do Node.js
const path = require("path"); // para lidar com caminhos de ficheiros
const expressLayouts = require("express-ejs-layouts"); // plugin para usar um layout base com EJS
const mongoose = require("mongoose"); // ODM para MongoDB
require("dotenv").config(); // carrega variáveis de ambiente do ficheiro .env
const app = express(); // inicializa a aplicação Express
const PORT = process.env.PORT || 3000; // porta do servidor (usa 3000 se não houver variável de ambiente)

// configuração do motor de templates EJS
app.set("view engine", "ejs"); // define EJS como motor de views
app.set("views", path.join(__dirname, "..", "client", "views")); // define a pasta onde estão as views

// middlewares
app.use(express.static(path.join(__dirname, "..", "client", "public"))); // serve ficheiros estáticos (CSS, imagens)
app.use(express.urlencoded({ extended: true })); // para ler dados de formulários (POST)
app.use(expressLayouts); // usa layouts com EJS

// importa as rotas
const routes = [
  "clientMyApplicationsRoute",
  "clientMyProfileRoute",
  "companyCandidatesRoute",
  "companyCreateAnnouncementRoute",
  "companyManageAnnouncementRoute",
  "companyMyAnnouncementsRoute",
  "companyMyProfileRoute",
  "homeRoute",
  "loginRoute",
  "searchFilterRoute",
  "clientSubmitRoute",
  "resetPasswordRoute",
  "clientDetailsAnnouncementRoute",
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
