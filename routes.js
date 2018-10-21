'use strict';

var express = require('express');
var router = express.Router();

// Books related APIs
var booksApi = require('./apis/books');
router.use('/books', booksApi);

module.exports = router;