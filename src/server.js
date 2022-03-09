'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3006;
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRouter = require('./auth/routes.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(authRouter);
app.use(notFound);
app.use(errorHandler);
function start() {
  app.listen(PORT, () => {
    console.log(`Server Up on ${PORT}`);
  });
}
module.exports = {
  server: app,
  start: start
};