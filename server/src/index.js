// our packages
import app from './app';

// start server
app.listen(8080, function() {
  const addr = this.address();
  const {host, port} = addr;
  console.log(`Shard listening at http://${host}:${port}`);
});

// output all uncaught exceptions
process.on('uncaughtException', err => console.error('uncaught exception: ', err));
process.on('unhandledRejection', err => console.error('unhandled rejection: ', err));
