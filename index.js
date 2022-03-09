'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index');
const { start } = require('./src/server');

db.sync()
.then(() => {
  // Start the web server
  start();
  });