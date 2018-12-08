'use strict';

var mongoose = require('mongoose');

// Schema from mongoose
var Schema = mongoose.Schema;

// Use Schema to create our own Book Schema
var bookSchema = new Schema({
    isbn: String,
    title : String,
    description : String,
    quantity : Number,
    author: String
});

// Create a model('BookModel') to our defined Schema and export it outside
module.exports = mongoose.model('BookModel', bookSchema);