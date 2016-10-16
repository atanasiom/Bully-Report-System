const express = require('express'),
  config = require('./config/config');

process.on('uncaughtException', error => {
  // if (!error) return;
  // if (error && error.alreadyProcessed) return;

  // console.error('uncaught exception %s', (error ? error.stack : error));
  console.error('unhandled exception %s', (error ? error : undefined));
  throw error;
});

// Enable to crash on errors eaten by promises
process.on('unhandledRejection', error => {
  // if (!error) return;
  // if (error && error.alreadyProcessed) return;

  console.error('unhandled rejection %s', (error ? error : undefined));
  throw error;
});

// exit handler
process.on('SIGBREAK', () => {
  console.log('Process Exiting - SIGBREAK');
  process.exit();
});


const app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

