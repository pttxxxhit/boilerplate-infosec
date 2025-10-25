const express = require('express');
const app = express();
const helmet = require('helmet'); // ← requerido previamente

var ninetyDaysInSeconds = 90 * 24 * 60 * 60; // ← duración para HSTS

app.use(helmet({
  hidePoweredBy: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
  noSniff: true,
  ieNoOpen: true,
  hsts: { maxAge: ninetyDaysInSeconds, force: true },
  dnsPrefetchControl: true,
  noCache: true, // ← no se incluye por defecto, lo activamos
  contentSecurityPolicy: { // ← no se incluye por defecto, lo activamos
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"]
    }
  }
}));

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
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
