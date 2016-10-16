import * as express from 'express';
const router = express.Router();

module.exports = (app: any) => {
  app.use('/api/tickets', require('./tickets'));
};