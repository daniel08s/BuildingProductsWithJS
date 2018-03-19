// npm packages
import passport from 'passport';

// our packages
import {r, Question} from '../db';
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

  app.get('/api/question', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // get 10 latest questions
    const questions = await Question
      .merge(q => ({
        owner: r.db('expertsdb').table('User').get(q('owner')).without(['password']),
      }))
      .orderBy(r.desc('creationDate'))
      .limit(10)
      .execute();

    // send questions back
    res.send(questions);
  }));
};
