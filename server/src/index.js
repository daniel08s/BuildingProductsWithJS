// our packages
import app from './app';
import {logger} from './util';
import {thinky} from './db';

// wait for DB to initialize
thinky.dbReady().then(() => {
  logger.info('Database ready, starting server...');
  // start server
  app.listen(8080, function() {
    const addr = this.address();
    const {address, port} = addr;
    logger.info(`Experts server is listening at http://${address}:${port}`);
  });
});

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('uncaught exception: ', err));
process.on('unhandledRejection', err => logger.error('unhandled rejection: ', err));
