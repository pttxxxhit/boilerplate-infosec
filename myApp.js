require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');

// HSTS: fuerza HTTPS por 90 días
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));

// Otras configuraciones de seguridad
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'deny' }));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta de prueba
app.get('/json', (req, res) => {
  res.json({ message: "Hello json" });
});

module.exports = app;
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
