/**

 service-status.js

 Retrieves subway service status

*/

var http = require('http'),
    XmlStream = require('xml-stream');

// Subway service XML
var hostx = "web.mta.info",
    pathx = "/status/serviceStatus.txt";

// Retrieve service status for all lines from subway service status XML
function getServiceStatus(callback) {
    'use strict';

    // Request service status
    http.get({
        host: hostx,
        path: pathx
    }).on('response', function (res) {
        parseSubwayXml(res, callback);
    });
}

// Make accessible in service-status.js exports
module.exports.getServiceStatus = getServiceStatus;

// Parse subway service status XML
function parseSubwayXml(res, callback) {
    'use strict';

    var serviceStatus = '';

    // Pass the response as UTF-8 to XmlStream
    res.setEncoding('utf8');
    var xml = new XmlStream(res);

    // Parse by subway line
    xml.on('endElement: service > subway > line', function (currentLine) {
        // Add status for the current line to our combined serviceStatus
        // TODO: Make status real and set this to an object of train statuses
        /**
            currentLine looks like...
            { name: '123', // Will need to parse this out by line
              status: 'PLANNED WORK',
              text: '<span class="TitlePlannedWork" >Lots of HTML junk...',
              Date: '04/10/2016',
              Time: '7:12PM'
            }
        */
        serviceStatus += "DELAYED"; // Temp for testing
    });

    xml.on('end', function () {
        callback(serviceStatus);
    });
}