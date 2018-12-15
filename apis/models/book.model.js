'use strict';

var mongoose = require('mongoose');

// Schema from mongoose
var Schema = mongoose.Schema;

// Book genre schema
var bookGenreSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

// Use Schema to create our own Book Schema
var bookSchema = new Schema({
    isbn: {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        default: ''
    },
    quantity : {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true,
        lowercase: true
    },
    frontCover: String,
    backCover: String,
    language: {
        type: String,
        lowercase: true,
        default: 'english'
    },
    genre: {
        type: [bookGenreSchema]
    }
});

// Create a model('BookModel') to our defined Schema and export it outside
module.exports = mongoose.model('BookModel', bookSchema);