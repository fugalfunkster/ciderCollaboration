'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const appleRoutes = require('./api/routes/applesRoutes');
appleRoutes(app);

app.listen(port);

console.log('Server started on port ' + port);
