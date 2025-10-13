const express = require('express');
const helmet  = require('helmet');
const api     = require('./server.js'); // tu API o rutas

const app = express();

// HSTS: fuerza HTTPS durante los próximos 90 días
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true
  })
);

// servir archivos estáticos desde /public
app.use(express.static('public'));

// rutas de tu API
app.use('/_api', api);

// página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// arrancar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

// exportar app para tests o integraciones
module.exports = app;























