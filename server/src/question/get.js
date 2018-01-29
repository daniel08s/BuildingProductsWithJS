// npm packages
import passport from 'passport';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/question/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // get requested question
    try {
      const question = await Question.get(req.params.id);

      // send question back
      res.send(question);
    } catch (e) {
      res.status(400).send({error: 'Question does not exist'});
    }
  }));

  app.get('/api/question/me/:owner', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // find all questions from user
    let questions = [];
    try {
      questions = await Question.filter(req.params.owner).run();

      // send questions backs
      res.send(questions);
    } catch (e) {
      res.status(400).send({error: 'User does not have active questions'});
    }
  }));
};
