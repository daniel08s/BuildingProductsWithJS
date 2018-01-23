/* eslint global-require: 0 */
// say we're testing to evade excessive logging
// usage of process.env is workaround for issues with setting env vars in windows
process.env.NODE_ENV = 'testing';

const spawn = require('child_process').spawn;

// reqlite instance
const reqlite = spawn('reqlite');

// wait for start
reqlite.stderr.on('data', () => {
  // require and start main tests
  const startTests = require('./main').default;
  startTests(reqlite);
});

// require babel require hook
require('babel-core/register');
