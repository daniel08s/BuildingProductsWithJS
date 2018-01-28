// npm packages
import passport from 'passport';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/question/:owner', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // find all questions from user
    let questions = [];
    try {
      questions = await Question.filter(req.params.owner)
        .run();
      res.send(questions);
    } catch (e) {
      res.status(400).send({error: 'User does not have active questions'});
    }
  }));
};
