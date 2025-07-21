const express = require("express");


const http = require("http");


const expressLayouts = require("express-ejs-layouts"); // layout base (footer, header e head)


const app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);

const server = http.createServer(app);

const SERVER_PORT = 3000;

server.listen(SERVER_PORT, () => {
  console.log(`ON -- http://localhost:${SERVER_PORT}`);
});