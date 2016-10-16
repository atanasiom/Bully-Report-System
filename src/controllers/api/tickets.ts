import * as express from 'express';
const router = express.Router();
import * as models from '../../models';
import * as services from '../../services';

module.exports = (app: any) => {
  app.use('/api/tickets', router);
};

/** Routes **/
router.get('/postTicket', ticket);

/** Implementations */
function ticket(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ticket = new models.Ticket(req.body.data);
  // services.aws.uploadTicket(ticket);
  res.send('pong');
}