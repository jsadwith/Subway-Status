/**

 router.js

 Router setup

*/

// Include server.js to get Express
var server = require('../../server.js');

// Set up router
var router = module.exports.router = server.express.Router();

// Middleware for each request
router.use(function (req, res, next) {
    'use strict';
    console.log('Request to /api/');
    next(); // Keep going
});

// Include routes
require('./routes.js');