/**

 Server.js

 Basic HTTP server running on 8080

*/

// Import packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Status = require('./app/models/status');

// Use body-parser to get data from POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017'); // connect to our database

// Set port
var port = process.env.PORT || 8080;

// Set up router
var router = express.Router();              // get an instance of the express Router

// Set up routes
router.get('/', function (request, response) {
    'use strict';
    response.json({message: 'Index route'});
});

// Register routes at /api
app.use('/api', router);

// Start server
app.listen(port);
console.log('Server started on port ' + port);