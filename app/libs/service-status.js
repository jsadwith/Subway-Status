/**

 service-status.js

 Retrieves subway service status

*/

var http = require('http'),
    debug = require('debug')('http'),
    XmlStream = require('xml-stream'),
    fs = require('fs'),
    server = require('../../server.js'),
    Readable = require('stream').Readable || require('readable-stream'),
    config = require('../../config');


// PROD: Subway service XML
var hostx = "web.mta.info",
    pathx = "/status/serviceStatus.txt";

// Retrieve service status for all lines from subway service status XML
function getServiceStatus(callback) {
    'use strict';

    var stream = new Readable();

    // If dev file, pull contents and turn into a readable stream
    if (typeof config.subwaystatusurl !== 'undefined') {
        var devXml = config.subwaystatusurl;
        debug("Subway Status URL: " + devXml);

        var data = fs.readFileSync(devXml, {encoding: 'utf8'});
        stream.push(data);
        stream.push(null);

        parseSubwayXml(stream, callback);
    }
    // Request service status from production
    else {
        debug("Subway Status URL: " + hostx + pathx);
        var data = '';

        http.get({
            host: hostx,
            path: pathx
        }, function (response) {
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function (err) {
                if (err) {
                    // TODO: Add error handling
                    // console.error(err);
                }
                else {
                    // TODO: Consolidate this with dev stream push
                    stream.push(data);
                    stream.push(null);
                    parseSubwayXml(stream, callback);
                }
            });
        });
    }
}

// Make accessible in service-status.js exports
module.exports.getServiceStatus = getServiceStatus;

// Retrieve service status for all lines from subway service status XML
function getByTrain(subwayLine, callback) {
    'use strict';

    debug("Retrieving train status for line: " + subwayLine);

    for(var i = 0; i < server.statuses.length; i++) {
        var currentLine = server.statuses[i];

        // If we find a match from the user input, return the line here
        if(currentLine.line.toLowerCase().indexOf(subwayLine) > -1) {
            return callback('', currentLine);
        }
    }
    callback('Subway line ' + subwayLine + ' not found.');
}

// Make accessible in service-status.js exports
module.exports.getByTrain = getByTrain;

// Parse subway service status XML
function parseSubwayXml(res, callback) {
    'use strict';

    var serviceStatus = [];

    // Pass the response as UTF-8 to XmlStream
    // res.setEncoding('utf8');
    var xml = new XmlStream(res);

    // Parse by subway line
    xml.on('endElement: service > subway > line', function (currentLine) {

        /**
            currentLine looks like...
            { name: '123', // Will need to parse this out by line
              status: 'PLANNED WORK',
              text: '<span class="TitlePlannedWork" >Lots of HTML junk...',
              Date: '04/10/2016',
              Time: '7:12PM'
            }
        */

        // Add status for the current line to our combined serviceStatus
        serviceStatus.push({
            line: currentLine.name,
            status: currentLine.status,
            text: currentLine.text,
            date: currentLine.Date,
            time: currentLine.Time
        });
    });

    xml.on('end', function () {
        return callback(serviceStatus);
    });
}