import * as express from 'express';
const router = express.Router();
import * as models from '../models';
import * as services from '../services';

module.exports = (app: any) => {
  app.use('/', router);
};

/** Routes **/
router.get('/', tickets);
router.get('/submit', submit);

/** Implementations */
function tickets(req: express.Request, res: express.Response, next: express.NextFunction) {
  const email = req.query.email || 'jake.ferrante@hotmail.com';
  services.aws.retrieveTickets(email).then(response => {
    console.log(response.data);
    res.render('index', {
      title: 'Tickets View',
      items: JSON.stringify(response.data)
    });
  }).catch((err: Error) => res.render('error', {
    message: err.message,
    stack: err.stack,
  }));
}

function submit(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.render('index', {
    title: 'Ticket Submission Page',
  });
}

function retrieveTicketImage(req: express.Request, res: express.Response, next: express.NextFunction): any {
  const filePath = 'tbd';
  res.sendFile(filePath);
}