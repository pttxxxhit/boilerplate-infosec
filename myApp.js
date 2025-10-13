const express = require('express');
const helmet  = require('helmet');
const app     = express();

// HSTS: fuerza HTTPS durante los próximos 90 días
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true
  })
);

const api = require('./server.js'); 

// servir archivos estáticos
app.use(express.static('public')); 

// montar la API
app.use('/_api', api);  

// ruta principal
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// arrancar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;
