/**
 * Swagger used to document all available APIs
 * 
 * API information should be updated to swagger.yaml file so the document page can be up to date.
 * 
 * Access the API docs at http://host:port/api-docs
 */
'use strict';

var express = require('express');
var router = express.Router();

// Swagger UI provider, this helps to visualize our API schema
const swaggerUi = require('swagger-ui-express');

/**
 * Swagger supports to load json files,
 * but it is good to have the API schema in YAML format(easy to read),
 * 
 * This can be used to convert our YAML file to JSON
 */
const YAML = require('yamljs');

// Swagger document created from our YAML file, this will be shown in Swagger UI
const swaggerDocument = YAML.load('./api-docs/swagger.yaml')

// Load the Swagger API document view
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Export our Swagger API documentation router to outside
module.exports = router;