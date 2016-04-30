/**

  spec/service-status-spec.js

  Tests for subway service-status requests
*/

var serviceStatus = require("../app/libs/service-status.js");

describe("Get subway status for train", function () {
    it("returns an object", function () {
        var status = serviceStatus.getByTrain('1', function (err, status) {
            return status;
        });

        var statusTest = {
            'line': '123',
            'status': 'PLANNED WORK',
            'text': 'TEST',
            'date': '04/10/2016',
            'time': '3:42PM'
        };

        expect(status).toEqual(statusTest);
    });
});

// describe("Get subway status for train", function () {
//     it("returns the status for a train as an object", function () {
//         var status = serviceStatus.getByTrain('n', function (err, status) {
//             return status;
//         });
//         expect(status).toBe(6);
//     });
// });