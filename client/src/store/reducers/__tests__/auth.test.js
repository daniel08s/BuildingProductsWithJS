/* global test expect */
import {auth} from '../auth';
import * as ActionTypes from '../../actionTypes';

const user = {
  login: 'testuser',
  password: '123',
  passwordRepeat: '123',
};

test('# auth reducer - register success', () => {
  const testState = {
    token: '123',
    user,
  };
  const action = {type: ActionTypes.REGISTER_SUCCESS};
  expect(auth(testState, action)).toBeTruthy();
});

test('# auth reducer - login success', () => {
  const testState = {
    token: '123',
    user,
  };
  const action = {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: {token: '123', user, test: true},
  };
  expect(auth(testState, action).test).toBeTruthy();
  expect(auth(testState, action).user).toEqual(user);
  expect(auth(testState, action).token).toEqual('123');
});

test('# auth reducer - errors', () => {
  const testState = {
    token: '123',
    user,
  };
  expect(auth(testState, {type: ActionTypes.LOGIN_ERROR})).toEqual(testState);
  expect(auth(testState, {type: ActionTypes.REGISTER_ERROR})).toEqual(testState);
  expect(auth(testState, {type: '-1'})).toEqual(testState);
});

test('# auth reducer - update user success', () => {
  const testState = {
    token: '123',
    user,
  };
  const newLogin = 'newTestUser';
  user.login = newLogin;
  const action = {
    type: ActionTypes.UPDATE_USER_SUCCESS,
    payload: {token: '123', user},
  };
  expect(auth(testState, action).user.login).toEqual(newLogin);
  expect(auth(testState, action).token).toEqual('123');
});
