/**

 server.js

 Basic HTTP server running on 8080

*/

// Import packages
var express = module.exports.express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Use body-parser to get data from POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router_exports = require('./app/router/router.js');
var router = router_exports.router;

// Register routes at /api
app.use('/api', router);

// Set port
var port = process.env.PORT || 8080;

// Start server
app.listen(port);
console.log('Server started on port ' + port);