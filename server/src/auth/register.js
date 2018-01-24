// our packages
import {User} from '../db';
import {hash, asyncRequest} from '../util';

// export const loginTaken = async(login) => {
//  // check if login is already taken
//  const users = await User.filter({login}).run();
//  return users.length > 0;
// };

export default (app) => {
  app.post('/api/register', asyncRequest(async(req, res) => {
    // get user input
    const {login, password, passwordRepeat} = req.body;

    if (password !== passwordRepeat) {
      res.status(400).send({error: 'Passwords do not match!'});
      return;
    }
    // hash password
    const hashedPassword = hash(password);

    // check if login already taken
    // const exists = loginTaken(login);
    const users = await User.filter({login}).run();
    if (users.length > 0) {
      res.status(403).send({error: 'User is already registered!'});
      return;
    }

    // save new user
    const user = new User({
      login,
      password: hashedPassword,
    });
    await user.save();

    res.sendStatus(201);
  }));
};
