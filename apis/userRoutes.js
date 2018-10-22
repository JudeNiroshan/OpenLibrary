/**
 * All user related routes are defined and attached to express.Router() instance
 */
'use strict';

var express = require('express');
var router = express.Router();

// Get all users
router.get('/', (req, res) => {
  res.json([{name: 'jude'}, {name: 'Ishara'}, {name: 'theepan'}])
});

//export this router to use in our routes.js
module.exports = router;