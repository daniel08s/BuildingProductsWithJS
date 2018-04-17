/* global test expect */
import {users} from '../users';
import * as ActionTypes from '../../actionTypes';

const user = {
  login: 'testuser',
  password: '123',
  passwordRepeat: '123',
};

test('# users reducer - get/update user', () => {
  const testState = {};
  const actions = [{type: ActionTypes.GET_USER}, {type: ActionTypes.UPDATE_USER}];
  expect(users(testState, actions[0])).toEqual({user: null, status: 'loading'});
  expect(users(testState, actions[1])).toEqual({user: null, status: 'loading'});
});

test('# users reducer - get user success', () => {
  const testState = {};
  const action = {
    type: ActionTypes.GET_USER_SUCCESS,
    payload: {
      user,
    },
  };
  expect(users(testState, action)).toEqual({user, status: 'done'});
});

test('# users reducer - update user success', () => {
  const testState = {};
  const action = {
    type: ActionTypes.UPDATE_USER_SUCCESS,
    payload: {
      user,
    },
  };
  expect(users(testState, action)).toEqual({user, status: 'done'});
});

test('# users reducer - errors', () => {
  const testState = {user};
  const action = {
    payload: {
      user,
      error: 'test error',
    },
  };
  expect(users(testState, {...action, type: ActionTypes.GET_USER_ERROR}))
    .toEqual({
      ...testState,
      status: 'error',
      error: action.payload.error
  });
  expect(users(testState, {...action, type: ActionTypes.UPDATE_USER_ERROR}))
      .toEqual({
      ...testState,
      status: 'error',
      error: action.payload.error
  });
  expect(users(testState, {type: '-1'})).toEqual(testState);
});
