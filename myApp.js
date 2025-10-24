require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const app = express();

// Instrucciones de seguridad con Helmet
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());

// ✅ Esta es la séptima instrucción: HSTS con variable y force:true
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta JSON requerida por el test
app.get('/json', (req, res) => {
  res.json({ message: "Hello json" });
});

// Escuchar en el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

module.exports = app;
