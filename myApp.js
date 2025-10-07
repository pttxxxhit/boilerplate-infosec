const ninetyDaysInSeconds = 90 * 24 * 60 * 60; // Definimos la variable
const express = require('express');
const helmet = require('helmet');
const app = express();
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter({}));
app.use(helmet.noSniff())));
app.use(helmet.ieNoOpen());
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
// Montamos el middleware sin la opción force: true
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
  })
);



































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
