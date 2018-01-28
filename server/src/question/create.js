// npm packages
import passport from 'passport';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // get user input
    const {text, expirationDate} = req.body;

    // save new question
    const question = new Question({
      text,
      expirationDate,
      owner: req.user.id,
    });
    await question.save();

    // send created question back
    res.send(question);
  }));
};
