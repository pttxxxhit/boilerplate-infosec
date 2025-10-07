const express = require('express');
const helmet = require('helmet');

const app = express();
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// Configuración de Helmet
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter()); // No necesita objeto vacío
app.use(helmet.noSniff());   // Se corrigió paréntesis extra
app.use(helmet.ieNoOpen());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true, // Activamos HSTS con HTTPS obligatorio
  })
);
























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
