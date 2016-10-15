"use strict";
var express = require('express');
var router = express.Router();
var models = require('../models');
module.exports = function (app) {
    app.use('/', router);
};
/** Routes **/
router.get('/', tickets);
router.get('/submit', submit);
/** Implementations */
function tickets(req, res, next) {
    var articles = [new models.Ticket(), new models.Ticket()];
    res.render('index', {
        title: 'Tickets View',
        articles: articles
    });
}
function submit(req, res, next) {
    var articles = [new models.Ticket(), new models.Ticket()];
    res.render('index', {
        title: 'Ticket Submission Page',
        articles: articles
    });
}
function retrieveTicketImage(req, res, next) {
    var filePath = 'tbd';
    res.sendFile(filePath);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb250cm9sbGVycy90aWNrZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbnZhciBtb2RlbHMgPSByZXF1aXJlKCcuLi9tb2RlbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC51c2UoJy8nLCByb3V0ZXIpO1xufTtcbi8qKiBSb3V0ZXMgKiovXG5yb3V0ZXIuZ2V0KCcvJywgdGlja2V0cyk7XG5yb3V0ZXIuZ2V0KCcvc3VibWl0Jywgc3VibWl0KTtcbi8qKiBJbXBsZW1lbnRhdGlvbnMgKi9cbmZ1bmN0aW9uIHRpY2tldHMocmVxLCByZXMsIG5leHQpIHtcbiAgICB2YXIgYXJ0aWNsZXMgPSBbbmV3IG1vZGVscy5UaWNrZXQoKSwgbmV3IG1vZGVscy5UaWNrZXQoKV07XG4gICAgcmVzLnJlbmRlcignaW5kZXgnLCB7XG4gICAgICAgIHRpdGxlOiAnVGlja2V0cyBWaWV3JyxcbiAgICAgICAgYXJ0aWNsZXM6IGFydGljbGVzXG4gICAgfSk7XG59XG5mdW5jdGlvbiBzdWJtaXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB2YXIgYXJ0aWNsZXMgPSBbbmV3IG1vZGVscy5UaWNrZXQoKSwgbmV3IG1vZGVscy5UaWNrZXQoKV07XG4gICAgcmVzLnJlbmRlcignaW5kZXgnLCB7XG4gICAgICAgIHRpdGxlOiAnVGlja2V0IFN1Ym1pc3Npb24gUGFnZScsXG4gICAgICAgIGFydGljbGVzOiBhcnRpY2xlc1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmV0cmlldmVUaWNrZXRJbWFnZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHZhciBmaWxlUGF0aCA9ICd0YmQnO1xuICAgIHJlcy5zZW5kRmlsZShmaWxlUGF0aCk7XG59XG4iXSwiZmlsZSI6ImNvbnRyb2xsZXJzL3RpY2tldHMuanMifQ==
