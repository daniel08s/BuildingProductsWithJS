// npm packages
import passport from 'passport';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.delete('/api/question/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // get requested question
    const question = await Question.get(req.params.id);

    // check if user is changing his own profile
    if (req.user.id !== question.owner) {
      res.status(403).send({error: 'Not enough permissions to delete other user profile!'});
      return;
    }

    // delete the question
    await question.delete();

    // send question back
    res.sendStatus(204);
  }));
};
