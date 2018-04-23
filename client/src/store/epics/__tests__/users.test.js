/* global test expect shallow */
import {Observable} from 'rxjs';
import {ActionsObservable} from 'redux-observable';

import * as ActionTypes from '../../actionTypes';
import {getUser, updateUser} from '../users';

let oldPost;
let oldGet;

beforeEach(() => {
  oldPost = Observable.ajax.post;
  oldGet = Observable.ajax.get;
});

afterEach(() => {
  Observable.ajax.post = oldPost;
  Observable.ajax.get = oldGet;
});

test('# users epic - getUser success', () => {
  const payload = {id: 0};
  const headers = {'x-access-token': undefined};
  const response = {user: 'dns'};
  const input = {type: ActionTypes.GET_USER, payload, headers};
  const action$ = ActionsObservable.from([input]);
  const get = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.get = get;

  getUser(action$)
    .subscribe((res) => {
      expect(get.mock.calls.length).toBe(1);
      expect(get.mock.calls[0][0]).toBe('http://localhost:8080/api/user/0');
      expect(get.mock.calls[0][1]).toEqual(headers);
      expect(res).toEqual({type: ActionTypes.GET_USER_SUCCESS, payload: {user: response}});
    });
});

test('# users epic - getUser error', () => {
  const action$ = ActionsObservable.from([{type: ActionTypes.GET_USER, payload: {}}]);

  getUser(action$)
    .subscribe((res) => {
      expect(res.type).toBe('GET_USER_ERROR');
      expect(res.payload.error.AjaxError.message).toBe('ajax error');
    });
});

test('# users epic - updateUser success', () => {
  const payload = {id: 0, test: 'dns'};
  const response = {data: true};
  const headers = {'x-access-token': undefined};
  const input = {type: ActionTypes.UPDATE_USER, payload, headers};
  const action$ = ActionsObservable.from([input]);
  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  updateUser(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(post.mock.calls.length).toBe(1);
        expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/user/0');
        expect(post.mock.calls[0][1]).toEqual(payload);
        expect(post.mock.calls[0][2]).toEqual(headers);
        expect(res).toEqual({type: ActionTypes.UPDATE_USER_SUCCESS, payload: {user: response}});
        responseCount += 1;
      } else {
        expect(res).toEqual({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: 0,
            text: 'User updated with success!',
            alertType: 'info',
          },
        });
      }
    });
});

test('# users epic - updateUser error', () => {
  const action$ = ActionsObservable.from([{type: ActionTypes.UPDATE_USER, payload: {}}]);

  let responseCount = 0;
  updateUser(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(res.type).toBe('UPDATE_USER_ERROR');
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
