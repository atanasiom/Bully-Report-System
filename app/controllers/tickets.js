"use strict";
var express = require('express');
var router = express.Router();
var services = require('../services');
module.exports = function (app) {
    app.use('/', router);
};
/** Routes **/
router.get('/', tickets);
router.get('/submit', submit);
/** Implementations */
function tickets(req, res, next) {
    var email = req.query.email || 'jake.ferrante@hotmail.com';
    services.aws.retrieveTickets(email);
    res.render('index', {
        title: 'Tickets View'
    });
}
function submit(req, res, next) {
    res.render('index', {
        title: 'Ticket Submission Page'
    });
}
function retrieveTicketImage(req, res, next) {
    var filePath = 'tbd';
    res.sendFile(filePath);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb250cm9sbGVycy90aWNrZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbnZhciBzZXJ2aWNlcyA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAudXNlKCcvJywgcm91dGVyKTtcbn07XG4vKiogUm91dGVzICoqL1xucm91dGVyLmdldCgnLycsIHRpY2tldHMpO1xucm91dGVyLmdldCgnL3N1Ym1pdCcsIHN1Ym1pdCk7XG4vKiogSW1wbGVtZW50YXRpb25zICovXG5mdW5jdGlvbiB0aWNrZXRzKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdmFyIGVtYWlsID0gcmVxLnF1ZXJ5LmVtYWlsIHx8ICdqYWtlLmZlcnJhbnRlQGhvdG1haWwuY29tJztcbiAgICBzZXJ2aWNlcy5hd3MucmV0cmlldmVUaWNrZXRzKGVtYWlsKTtcbiAgICByZXMucmVuZGVyKCdpbmRleCcsIHtcbiAgICAgICAgdGl0bGU6ICdUaWNrZXRzIFZpZXcnXG4gICAgfSk7XG59XG5mdW5jdGlvbiBzdWJtaXQocmVxLCByZXMsIG5leHQpIHtcbiAgICByZXMucmVuZGVyKCdpbmRleCcsIHtcbiAgICAgICAgdGl0bGU6ICdUaWNrZXQgU3VibWlzc2lvbiBQYWdlJ1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmV0cmlldmVUaWNrZXRJbWFnZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHZhciBmaWxlUGF0aCA9ICd0YmQnO1xuICAgIHJlcy5zZW5kRmlsZShmaWxlUGF0aCk7XG59XG4iXSwiZmlsZSI6ImNvbnRyb2xsZXJzL3RpY2tldHMuanMifQ==
