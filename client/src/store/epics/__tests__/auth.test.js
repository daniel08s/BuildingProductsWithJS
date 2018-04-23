/* global test expect shallow */
import {Observable} from 'rxjs';
import {ActionsObservable} from 'redux-observable';

import * as ActionTypes from '../../actionTypes';
import {login, register} from '../auth';

let oldPost;

beforeEach(() => {
  oldPost = Observable.ajax.post;
});

afterEach(() => {
  Observable.ajax.post = oldPost;
});

test('# login epic - login success', () => {
  const payload = {test: true};
  const response = {data: true};
  const action$ = ActionsObservable.from([{type: ActionTypes.DO_LOGIN, payload}]);
  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  login(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(post.mock.calls.length).toBe(1);
        expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/login');
        expect(post.mock.calls[0][1]).toEqual(payload);
        expect(res).toEqual({type: 'LOGIN_SUCCESS', payload: {...response}});
        responseCount += 1;
      } else {
        expect(res).toEqual({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: 0,
            text: 'Login successful!',
            alertType: 'info',
          },
        });
      }
    });
});

test('# login epic - login error', () => {
  const action$ = ActionsObservable.from([{type: ActionTypes.DO_LOGIN, payload: {}}]);

  let responseCount = 0;
  login(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(res.type).toBe('LOGIN_ERROR');
        expect(res.payload.error.AjaxError.message).toBe('ajax error');
        responseCount += 1;
      } else {
        expect(res).toEqual({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: 1,
            text: 'ajax error',
            alertType: 'danger',
          },
        });
      }
    });
});

test('# register epic - registration success', () => {
  const payload = {test: true};
  const response = {data: true};
  const action$ = ActionsObservable.from([{type: ActionTypes.DO_REGISTER, payload}]);
  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  register(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(post.mock.calls.length).toBe(1);
        expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/register');
        expect(post.mock.calls[0][1]).toEqual(payload);
        expect(res).toEqual({type: 'REGISTER_SUCCESS', payload: {...response}});
        responseCount += 1;
      } else {
        expect(res).toEqual({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: 1,
            text: 'Registration successful!',
            alertType: 'info',
          },
        });
      }
    });
});

test('# register epic - registration error', () => {
  const action$ = ActionsObservable.from([{type: ActionTypes.DO_REGISTER, payload: {}}]);

  let responseCount = 0;
  register(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(res.type).toBe('REGISTER_ERROR');
        expect(res.payload.error.AjaxError.message).toBe('ajax error');
        responseCount += 1;
      } else {
        expect(res).toEqual({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: 1,
            text: 'ajax error',
            alertType: 'danger',
          },
        });
      }
    });
});
