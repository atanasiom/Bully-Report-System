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
    services.aws.retrieveTickets(email).then(function (response) {
        console.log(response.data);
        res.render('index', {
            title: 'Tickets View',
            items: JSON.stringify(response.data)
        });
    }).catch(function (err) { return res.render('error', {
        message: err.message,
        stack: err.stack
    }); });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb250cm9sbGVycy90aWNrZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbnZhciBzZXJ2aWNlcyA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAudXNlKCcvJywgcm91dGVyKTtcbn07XG4vKiogUm91dGVzICoqL1xucm91dGVyLmdldCgnLycsIHRpY2tldHMpO1xucm91dGVyLmdldCgnL3N1Ym1pdCcsIHN1Ym1pdCk7XG4vKiogSW1wbGVtZW50YXRpb25zICovXG5mdW5jdGlvbiB0aWNrZXRzKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdmFyIGVtYWlsID0gcmVxLnF1ZXJ5LmVtYWlsIHx8ICdqYWtlLmZlcnJhbnRlQGhvdG1haWwuY29tJztcbiAgICBzZXJ2aWNlcy5hd3MucmV0cmlldmVUaWNrZXRzKGVtYWlsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgcmVzLnJlbmRlcignaW5kZXgnLCB7XG4gICAgICAgICAgICB0aXRsZTogJ1RpY2tldHMgVmlldycsXG4gICAgICAgICAgICBpdGVtczogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YSlcbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikgeyByZXR1cm4gcmVzLnJlbmRlcignZXJyb3InLCB7XG4gICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgICBzdGFjazogZXJyLnN0YWNrXG4gICAgfSk7IH0pO1xufVxuZnVuY3Rpb24gc3VibWl0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVzLnJlbmRlcignaW5kZXgnLCB7XG4gICAgICAgIHRpdGxlOiAnVGlja2V0IFN1Ym1pc3Npb24gUGFnZSdcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJldHJpZXZlVGlja2V0SW1hZ2UocmVxLCByZXMsIG5leHQpIHtcbiAgICB2YXIgZmlsZVBhdGggPSAndGJkJztcbiAgICByZXMuc2VuZEZpbGUoZmlsZVBhdGgpO1xufVxuIl0sImZpbGUiOiJjb250cm9sbGVycy90aWNrZXRzLmpzIn0=
