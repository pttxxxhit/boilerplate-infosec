


var express = require('express');
var helmet = require('helmet');

var app = express();

// 👇 Esta es la línea que debes agregar justo después de la séptima instrucción
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// 👇 Y esta es la línea que activa HSTS con la configuración correcta
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));























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
