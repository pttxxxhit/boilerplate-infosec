var express = require('express');
var app = express();
var helmet = require('helmet');

// Middleware de seguridad
app.use(helmet());

// Configurar HSTS por 90 días
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));

// Servir archivos estáticos
app.use(express.static('public'));

// API interna
const api = require('./server.js');
app.use('/_api', api);

// Ruta principal
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Puerto de escucha
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;




























module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
