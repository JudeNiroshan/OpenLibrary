'use strict';

/**
 * This can be used as middleware in routes to verify requester has enough access.
 */
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    //Function verifies requester has user access
    verifyUser: function (req, res, next) {
        // Get the jwt access token from the request header
        var token = req.headers['x-access-token'];

        // If no token exist, then probablt not authenticated yet, thus send forbidden status
        if (!token) return res.status(403).json({ "message": "You don't have acces to this resource" });

        // Token present, verify it is a valid token to trust
        jwt.verify(token, config.jwtKey, function (err, decoded) {
            // Invalid token, send forbiddeb status
            if (err) return res.status(403).json({ 'message': 'Invalid token' })

            // Token is valid and decoded, set it request, so it can be used next
            req.decoded_token = decoded;

            // Call the next function in the statck
            next();
        });
    }
}