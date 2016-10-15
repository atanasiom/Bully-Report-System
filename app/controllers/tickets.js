var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');

module.exports = function (app) {
  app.use('/', router);
};

/** Routes **/
router.get('/', tickets);
router.get('/submit', submit);

/** Page Services */
function tickets(req, res, next) {
  var articles = [new Article(), new Article()];
  res.render('index', {
    title: 'Tickets View',
    articles: articles
  });
}

function submit(req, res, next) {
  var articles = [new Article(), new Article()];
  res.render('index', {
    title: 'Ticket Submission Page',
    articles: articles
  });
}

