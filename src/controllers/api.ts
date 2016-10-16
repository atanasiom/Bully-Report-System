import * as express from 'express';
const router = express.Router();
import * as models from '../models';
import * as services from '../services';

module.exports = (app: any) => {
  app.use('/api/ticket', router);
};

/** Routes **/
router.get('/upload', submit);

/** Implementations */
function submit(req: express.Request, res: express.Response, next: express.NextFunction) {
  // attempt to upload
  try {
    const data: models.interfaces.Ticket = {
      category: req.body.category,
      description: req.body.description,
      email: req.body.email,
      image: req.body.image,
      timestamp: new Date(Date.parse(req.body.timestamp)),
      url: req.body.url
    };
    services.aws.uploadTicket(new models.Ticket(data)).then(response => {
      if (response.err) {
        res.send(response.err);
        return;
      }
      res.send(response.data);
    });
  } catch (e) {
    // or catch and respond with error 
    res.send(e);
  }
  return;
}
