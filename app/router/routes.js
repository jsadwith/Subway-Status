/**

 routes.js

 Route setup

*/

// Include router.js to get the router
var router = require('./router.js');

// Set up routes
router.router.get('/', function (request, response) {
    'use strict';

    // var Status = require('../models/status');

    response.json({message: 'Index route'});
});