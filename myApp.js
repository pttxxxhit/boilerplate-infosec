// myApp.js
const express = require('express');
const helmet  = require('helmet');
const path    = require('path');
const api     = require('./api.js');   // Importa el Router, no la misma app

const app = express();

// Aplica HSTS global (90 días)
const ninetyDays = 90 * 24 * 60 * 60;
app.use(
  helmet.hsts({
    maxAge: ninetyDays,
    force: true
  })
);

// Sirve archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Monta el router de API
app.use('/_api', api);

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Arranca el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;
