'use strict';

var mongoose = require('mongoose');

// Schema from mongoose
var Schema = mongoose.Schema;

// Use Schema to create our own Book Schema
var userSchema = new Schema({
    username: String,
    password: String,
    admin: Boolean 
});

module.exports = mongoose.model('UserModel', userSchema);