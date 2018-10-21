'use strict';

var express = require('express');
var router = express.Router();

// Get all books
router.get('/', function(req, res) {
  res.json([{name: 'book 1'}, {name: 'book 2'}, {name: 'book 3'}])
});

module.exports = router;