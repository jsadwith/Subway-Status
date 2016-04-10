/**

 router.js

 Router setup

*/

// Include server.js to get Express
var server = require('../../server.js');

// Set up router
module.exports.router = server.express.Router();

// Include routes
require('./routes.js');