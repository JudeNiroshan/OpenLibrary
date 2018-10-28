/**
 * Central hub for all routes within the server
 * This has been registered in server.js
 */

'use strict';

var express = require('express');
var router = express.Router();

// Books related APIs
var booksApi = require('./apis/bookRoutes.js');
router.use('/book', booksApi);

// Users related APIs
var usersApi = require('./apis/userRoutes.js');
router.use('/user', usersApi);

// Authentication related APIs
var authRoutes = require('./apis/authRoutes');
router.use('/auth', authRoutes);

module.exports = router;