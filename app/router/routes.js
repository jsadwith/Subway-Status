/**

 routes.js

 Route setup

*/

// Include router.js exports to get the router
var routerExports = require('./router.js');
var router = routerExports.router;
var server = require('../../server.js');
var serviceStatus = require('../libs/service-status.js');

// Include status
var Status = require('../models/status');

// -----------------------
// Set up routes
// -----------------------

// Root route /
// Currently returns all subway statuses
router.route('/')

    .get(function (req, res, next) {
        'use strict';

        res.json({status: server.statuses});
    });

// Routes for /status/:train
router.route('/status/:train')

    // Retrieve status for train :train (accessed at GET http://localhost:8080/api/status/:train)
    .get(function (req, res, next) {
        'use strict';

        serviceStatus.getByTrain(req.params.train.toLowerCase(), function (err, status) {
            if (err) {
                return next(err);
            }
            res.json(status);
        });
    });

