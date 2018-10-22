'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Define API routes
var routes = require('./routes');
app.use('/api', routes);

// Test root
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

// All HTTP requests should follow http://${HOST}:${PORT}/api/*

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);