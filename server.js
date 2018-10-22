'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Define API routes central location
var routes = require('./routes.js');
app.use('/openlibrary', routes);
// All HTTP requests should follow http://${HOST}:${PORT}/openlibrary/*

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);