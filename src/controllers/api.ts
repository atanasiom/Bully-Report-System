import * as express from 'express';
const router = express.Router();
import * as models from '../models';
import * as services from '../services';

module.exports = (app: any) => {
  app.use('/api/ticket', router);
};

/** Routes **/
router.get('/list', list);
router.post('/submit', submit);

/** Implementations */
function submit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const data: models.interfaces.Ticket = {
    description: req.body.description,
    email: req.body.email,
    image: req.body.image,
    timestamp: req.body.timestamp || new Date(Date.now()).getTime().toString(),
    url: req.body.url,
    status: req.body.status,
    category: req.body.category
  };
  services.aws.uploadTicket(new models.Ticket(data)).then(response => {
    if (response.err) {
      res.send(response.err);
      return;
    }
    res.send(response.data);
  }).catch(err => { res.send(err); return; });
}

function list(req: express.Request, res: express.Response, next: express.NextFunction) {
  const email = req.query.email || 'jake.ferrante@hotmail.com';
  // attempt to upload
  services.aws.retrieveTickets(email).then(response => {
    if (response.err) {
      res.send(response.err);
      return;
    }
    res.send(response.data);
  }).catch(err => { res.send(err); return; });

  // services.aws.retrieveTickets(email).then(response => {
  //   console.log(response.data);
  //   res.render('index', {
  //     title: 'Tickets View',
  //     items: JSON.stringify(response.data)
  //   });
  // }).catch((err: Error) => res.render('error', {
  //   message: err.message,
  //   stack: err.stack,
  // }));

}
