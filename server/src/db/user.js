import {thinky} from './thinky';

// Create a model - the table is automatically created
export const User = thinky.createModel('User', {
  login: thinky.type.string().required(),
  password: thinky.type.string().required(),
  registrationDate: thinky.type.date().default(thinky.r.now()),
});
