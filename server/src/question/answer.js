// npm packages
import passport from 'passport';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question/:id/answer', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // get the question id
    const {id} = req.params;

    // get user input
    const {answer} = req.body;

    // validate if text is empty
    if (answer !== undefined && !answer.length) {
      res.status(400).send({error: 'Answer is mandatory!'});
      return;
    }

    // get the question
    const question = await Question.get(id);

    // double-check if question exists
    if (!question) {
      res.status(400).send({error: 'Question not found!'});
      return;
    }

    // append the answer to the question
    question.answers.push({answer, user: req.user.id});

    // save updated question
    await question.save();

    // send created question back
    res.send(question);
  }));
};
