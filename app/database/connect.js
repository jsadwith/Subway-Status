/**

 database/connect.js

 Connect to the MongoDB database

*/

// Connect to SubwayStatus db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SubwayStatus');