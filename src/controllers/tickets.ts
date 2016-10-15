import * as express from 'express';
const router = express.Router();
import * as models from '../models';

module.exports = (app: any) => {
  app.use('/', router);
};

/** Routes **/
router.get('/', tickets);
router.get('/submit', submit);

/** Implementations */
function tickets(req: express.Request, res: express.Response, next: express.NextFunction) {
  const articles = [new models.Ticket(), new models.Ticket()];
  res.render('index', {
    title: 'Tickets View',
    articles: articles
  });
}

function submit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const articles = [new models.Ticket(), new models.Ticket()];
  res.render('index', {
    title: 'Ticket Submission Page',
    articles: articles
  });
}

function retrieveTicketImage(req: express.Request, res: express.Response, next: express.NextFunction): any {
  const filePath = 'tbd';
  res.sendFile(filePath);
}