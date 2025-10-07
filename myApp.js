const express = require('express');
const helmet = require('helmet');

const app = express();
const ninetyDaysInSeconds = 90 * 24 * 60 * 60; // 90 días en segundos

// Configuración de Helmet
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter()); // No necesita objeto vacío
app.use(helmet.noSniff()); // Se eliminó paréntesis extra
app.use(helmet.ieNoOpen());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true, // Activamos la opción force
  })
);

// Evita duplicar app.use(helmet()) si ya usas los módulos por separado

// Rutas y configuración del servidor
const api = require('./server.js');
app.use(express.static('public'));
app.use('/_api', api);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;



























