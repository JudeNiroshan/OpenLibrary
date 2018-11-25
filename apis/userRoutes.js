/**
 * All user related routes are defined and attached to express.Router() instance
 */
'use strict';

var express = require('express');
var router = express.Router();
var userModel = require('./models/user.model');

// Get all users
router.get('/', (req, res) => {
  userModel.find(function (err, users) {
    if (err) return res.status(501).json(err);

    res.status(200).json(users);
  })
});

//export this router to use in our routes.js
module.exports = router;