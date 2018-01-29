// npm packages
import passport from 'passport';
import moment from 'moment';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // get the question id
    const {id} = req.params;

    // get user input
    const {text, expirationDate} = req.body;

    // validate if text is empty
    if (text !== undefined && !text.length) {
      res.status(400).send({error: 'Text is mandatory!'});
      return;
    }

    // validate if expiration date is valid
    if (expirationDate && !moment(expirationDate, moment.ISO_8601).isValid()) {
      res.status(400).send({error: 'Date should have a valid ISO format'});
      return;
    }

    // get the question
    const question = await Question.get(id);

    // double-check if question exists
    if (!question) {
      res.status(400).send({error: 'Question not found!'});
      return;
    }

    // check if user is changing his own profile
    if (req.user.id !== question.owner) {
      res.status(403).send({error: 'Not enough permissions to change other user profile!'});
      return;
    }

    // conditions to check if data is actually changed
    const textChanged = text && question.text !== text;
    const expDateChanged = expirationDate && !moment(question.expirationDate).isSame(expirationDate);

    // if not - just send OK
    if (!textChanged && !expDateChanged) {
      res.send(question);
      return;
    }

    // update the question
    if (text) {
      question.text = text;
    }
    if (expirationDate) {
      question.expirationDate = expirationDate;
    }

    // save updated question
    await question.save();

    // send created question back
    res.send(question);
  }));
};
