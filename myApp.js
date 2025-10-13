const express = require('express');
const helmet  = require('helmet');
// MyApp.js
const express = require('express');
const helmet  = require('helmet');
const path    = require('path');

const app = express();

// 1. HSTS: fuerza HTTPS durante los próximos 90 días
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true
  })
);

// 2. Sirve archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// 3. API inline (anida aquí todas tus rutas de API)
app.get('/_api', (req, res) => {
  // ejemplo de respuesta, extiende según necesites
  res.json({ message: 'API funcionando con HSTS activo' });
});

// 4. Ruta principal para tu HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 5. Arranque del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;
