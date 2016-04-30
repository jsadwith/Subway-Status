/**

 server.js

 Basic HTTP server running on 8080

*/

// Import packages
var express = module.exports.express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    serviceStatus = require('./app/libs/service-status.js');

// Set port for server
var port = process.env.PORT || 8080;

// Use body-parser to get data from POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routerExports = require('./app/router/router.js');
var router = routerExports.router;

// Register routes at /api
app.use('/api', router);

// Pull latest subway statuses into memory every 5 minutes
// TODO: Set up to actually pull every 5 minutes
serviceStatus.getServiceStatus(function onStatus(subwayStatuses) {
    'use strict';

    // Set statuses for global use
    module.exports.statuses = subwayStatuses;

    // Start server now that we have status
    app.listen(port);
    console.log('Server started on port ' + port);
});

