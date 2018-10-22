/**
 * All books related routes are defined and attached to express.Router() instance
 */
'use strict';

var express = require('express');
var router = express.Router();

// Get all books
router.get('/', (req, res) => {
  res.json([{name: 'book 1'}, {name: 'book 2'}, {name: 'book 3'}])
});

router.get('/:id', (req, res) => {
  res.json({name: 'Some book'});
});

router.put('/addbook', (req, res) => {
  res.json({name: 'book added'});
});

//export this router to use in our routes.js
module.exports = router;