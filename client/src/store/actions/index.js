import * as ActionTypes from '../actionTypes';

export const helloWorldAction = () => ({
  type: ActionTypes.HELLO_WORLD,
});

export const loginAction = payload => ({
  type: ActionTypes.DO_LOGIN,
  payload,
});
