const express = require("express"); // framework web
const http = require("http"); // módulo HTTP do Node.js
const path = require("path"); // para lidar com caminhos de ficheiros
const expressLayouts = require("express-ejs-layouts"); // plugin para usar um layout base com EJS

const app = express(); // inicializa a aplicação Express
const PORT = process.env.PORT || 3000; // porta do servidor (usa 3000 se não houver variável de ambiente)

// configuração do motor de templates EJS
app.set("view engine", "ejs"); // define EJS como motor de views
app.set("views", path.join(__dirname, "..", "client", "views")); // define a pasta onde estão as views

// Middlewares
app.use(express.static(path.join(__dirname, "..", "client", "public"))); // serve ficheiros estáticos (CSS, imagens)
app.use(express.urlencoded({ extended: true })); // para ler dados de formulários (POST)
app.use(expressLayouts); // usa layouts com EJS

// importa as rotas
const homeRoute = require("./routes/homeRoute");
app.use("/", homeRoute);
const myAdsRoute = require("./routes/myAdsRoute");
app.use("/myAds", myAdsRoute);
const createAdRoute = require("./routes/createAdRoute");
app.use("/createAd", createAdRoute);
const manageAdRoute = require("./routes/manageAdRoute");
app.use("/manageAd", manageAdRoute);

const loginRoute = require("./routes/loginRoute");
app.use("/", loginRoute);

// cria o servidor HTTP
const server = http.createServer(app);

// inicia o servidor
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // Mostra que o servidor está ativo
});
