'use strict';

module.exports = {
    /**
    * Database connection string,
    * Note that `mongo` name should be same as mongoDB service name defined in docker-compose.yml
    */
    'url': 'mongodb://mongo:27017/open-library',

    /**
    * key should not be checked into VCS,
    * this is done just for the development purpose, 
    * in real this should be fetched from ENV variables
    */
    'jwtKey': 'secretKey',

    /**
     * Function creates a default admin user with username `admin` and password `admin` 
     * once connected with db.
     * 
     * If the admin user already exist then this user will not be created.
     */
    createAdminUser: function () {
        var UserModel = require('./apis/models/user.model');
        var bcrypt = require('bcryptjs');

        var adminUser = {
            'username': 'admin',
            'password': bcrypt.hashSync('admin'),
            'role': 'admin'
        };

        UserModel.findOne({ 'username': 'admin' }, function (err, user) {
            if (err) return console.log("Failed to load admin user: " + err);

            if (!user) {
                console.log("Default admin user not found, creating one");

                UserModel.create(adminUser, function (err) {
                    if (err) return console.log("Failed to create default admin user");

                    console.log("Default admin user created, with username and password `admin`");
                });
            } else {
                console.log("Default admin user already exist");
            }
        });
    }
};