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
    'jwtKey': 'secretKey'
};