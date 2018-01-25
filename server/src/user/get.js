// npm packages
import passport from 'passport';

// our packages
import {User} from '../db';

export default (app) => {
  app.get('/api/user/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    if (req.params.id === 'me') {
      res.send(req.user);
      return;
    }
    const user = await User.get(req.params.id);
    res.send(user);
  });
};
