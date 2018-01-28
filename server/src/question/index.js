// our packages
// import get from './get';
import getOwned from './getOwned';
import create from './create';
// import update from './update';
// import remove from './remove';

export default (app) => {
//  get(app);
  getOwned(app);
  create(app);
//  update(app);
//  remove(app);
};
