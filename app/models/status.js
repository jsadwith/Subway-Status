/**

 models/status.js

 Schema for storing train status

*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var StatusSchema = new Schema({
    id: ObjectId,
    train: String,
    status: String,
    start: Date,
    end: Date
});

module.exports = mongoose.model('Status', StatusSchema);