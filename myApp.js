require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const app = express();

// Seguridad con Helmet
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));

// ✅ Servir archivos estáticos (como style.css)
app.use(express.static(__dirname + '/public'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta JSON
app.get('/json', (req, res) => {
  res.json({ message: "Hello json" });
});

// Escuchar en el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

module.exports = app;
