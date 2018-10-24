'use strict';

var mongoose = require('mongoose');

// Schema from mongoose
var Schema = mongoose.Schema;

// Use Schema to create our own Book Schema
var bookSchema = new Schema({
    name : String
});

// Create a model('BookModel') to our defined Schema and export it outside
module.exports = mongoose.model('BookModel', bookSchema);