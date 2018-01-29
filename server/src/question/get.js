// npm packages
import passport from 'passport';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/question/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // get requested question
    const question = await Question.get(req.params.id);

    // send question back
    res.send(question);
  }));

  app.get('/api/question/me/:owner', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // find all questions from user
    const questions = await Question.filter(req.params.owner).run();

    // send questions backs
    res.send(questions);
  }));
};
