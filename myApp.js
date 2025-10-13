var express = require('express');
var helmet  = require('helmet');
var api     = require('./server.js');

var app = express();

// 1–7. (Aquí estarían tus primeras siete líneas de configuración: middleware, rutas, etc.)
// ...

// 8. Definimos el tiempo de HSTS (90 días en segundos)
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// 9. Activamos HSTS con Helmet
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true
  })
);

// 10. Servir carpeta de archivos estáticos
app.use(express.static('public'));

// 11. Montar tu router de API
app.use('/_api', api);

// 12. Ruta principal
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// 13. Arrancar el servidor
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;
