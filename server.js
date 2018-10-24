'use strict';

const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Database connection
mongoose.connect(dbConfig.url);

//Supports mongoose to use global promise library
mongoose.Promise = global.Promise;

// log error to console if the db connection failed
var dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

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