'use strict';

/**
 * Handles the authentication, signin a user or register a new user
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var UserModel = require('./models/user.model');// Import our UserModel
var config = require('../config');

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Signin a user
router.post('/signin', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    // username or password missing, bad request
    if (!username | !password) return res.status(400).json({ 'message': 'Invalid data parsed' });

    // username saved in lowercase
    var lowerUsername = username.toLowerCase();

    // Conditions to find a user
    var conditions = {
        'username': lowerUsername
    };

    // Find one user with the username
    UserModel.findOne(conditions, function (err, user) {
        // Error when loading a user
        if (err) return res.status(500).json({ 'message': 'Error when loading user' });

        // User not found for given username, unautherized
        if (!user) return res.status(401).json({ 'auth': false, 'token': null, 'message': 'Authentication failed' });

        var passwordMatched = bcrypt.compareSync(password, user.password);

        // Check password match, if not matched, then unautherized
        if (!passwordMatched) return res.status(401).json({ 'auth': false, 'token': null, 'message': 'Authentication failed' });

        // Paylod to sign into JWT token
        var payload = { '_id': user._id, 'admin': user.admin };

        // Generate JWT token
        var jwtToken = jwt.sign(payload, config.jwtKey, { expiresIn: 86400 });

        // Send signin success and JWT token
        res.json({ 'auth': true, 'token': jwtToken });
    });
});

// Register a new user
router.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    // username or password missing, bad request
    if (!username | !password) return res.status(400).json({ 'message': 'Invalid data parsed' });

    var lowerUsername = username.toLowerCase();
    var hashedPassword = bcrypt.hashSync(password);

    // Confitions to find a user
    var conditions = {
        'username': lowerUsername
    };

    UserModel.findOne(conditions, function (err, user) {
        // Error when loading the user
        if (err) return res.status(500).json({ 'message': 'Error registering user' });

        // There is a user already in same username, send conflict status
        if (user) return res.status(409).json({ 'auth': false, 'token': null, 'message': 'Username already exist' });

        // Create new user
        UserModel.create({
            'username': lowerUsername,
            'password': hashedPassword,
            'admin': false
        }, function (err, user) {
            if (err) return res.status(500).json({ 'auth': false, 'token': null, 'message': 'Error registering user' })

            // Paylod to sign into JWT token
            var payload = { '_id': user._id, 'admin': user.admin };

            // Generate JWT token
            var jwtToken = jwt.sign(payload, config.jwtKey, { expiresIn: 86400 });

            // User created, autherized
            res.status(201).json({ 'auth': true, 'token': jwtToken });
        });

    });
});

module.exports = router;