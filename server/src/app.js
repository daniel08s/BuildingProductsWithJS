// npm packages
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';

// our packages
import {logger} from './util';
import {auth as authConfig} from '../config';
import setupAuthRoutes from './auth';

// init app
const app = express();

// setup logging
app.use(morgan('combined', {stream: logger.stream}));

// add body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// add cookie parsing
app.use(cookieParser());

// add session support
app.use(session({
  secret: authConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true},
}));

// add passport.js
app.use(passport.initialize());
app.use(passport.session());

// test method
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// login method
app.post('/login', (req, res) => {
  const {username, password} = req.body;
  if (username === 'test' && password === '123') {
    res.send({username, id: 1});
    return;
  }

  res.status(401).send({error: 'Incorrect username or password'});
});

// setup authentication routes
setupAuthRoutes(app);

// catch all unhandled errors
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send(err);
});

// export app
export default app;
