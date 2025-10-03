var express = require('express');
var app = express();
var helmet = require('helmet');

// Oculta el encabezado X-Powered-By
app.use(helmet.hidePoweredBy());

// Previene ataques XSS
app.use(helmet.xssFilter({}));

// Evita sniffing de tipos MIME
app.use(helmet.noSniff());

// Bloquea apertura de archivos inseguros en IE
app.use(helmet.ieNoOpen());

// Protege contra clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

// Configura HSTS por 90 días con force: true
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));

// Exporta la app para que pueda ser testeada
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
