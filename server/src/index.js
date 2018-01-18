// import express
import express from 'express';

// init app
const app = express();

// test method
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// catch all unhandled errors
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send(err);
});

// start server
app.listen(8080, function() {
  const addr = this.address();
  const {host, port} = addr;
  console.log(`Shard listening at http://${host}:${port}`);
});

// output all uncaught exceptions
process.on('uncaughtException', err => console.error('uncaught exception: ', err));
process.on('unhandledRejection', err => console.error('unhandled rejection: ', err));
