// our packages
import app from './app';
import {logger} from './util';

// start server
app.listen(8080, function() {
  const addr = this.address();
  const {host, port} = addr;
  logger.info(`Experts server is listening at http://${host}:${port}`);
});

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('uncaught exception: ', err));
process.on('unhandledRejection', err => logger.error('unhandled rejection: ', err));
