const express = require('express');
const app = express();
const helmet = require('helmet'); // ← requerido previamente

app.use(helmet.hidePoweredBy()); // ← paso anterior
app.use(helmet.frameguard({ action: 'deny' })); // ← paso anterior
app.use(helmet.xssFilter()); // ← paso anterior
app.use(helmet.noSniff()); // ← paso anterior
app.use(helmet.ieNoOpen()); // ← paso anterior
var ninetyDaysInSeconds = 90 * 24 * 60 * 60; // ← paso anterior
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true })); // ← paso anterior
app.use(helmet.dnsPrefetchControl()); // ← paso anterior
app.use(helmet.noCache()); // ← paso anterior
app.use(helmet.contentSecurityPolicy({ // ← paso actual
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "trusted-cdn.com"]
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
