/* global test expect shallow */
import {Observable} from 'rxjs';
import {ActionsObservable} from 'redux-observable';

import * as ActionTypes from '../../actionTypes';
import {getAllQuestions, answerQuestion, createQuestion, deleteQuestion, updateQuestion} from '../questions';

let oldGet;
let oldPost;
let oldDelete;

beforeEach(() => {
  oldGet = Observable.ajax.get;
  oldPost = Observable.ajax.post;
  oldDelete = Observable.ajax.delete;
});

afterEach(() => {
  Observable.ajax.get = oldGet;
  Observable.ajax.post = oldPost;
  Observable.ajax.delete = oldDelete;
});

test('# questions epic - getAllQuestions success', () => {
  const payload = {id: 0};
  const headers = {'x-access-token': undefined};
  const response = {user: 'dns'};
  const input = {type: ActionTypes.GET_ALL_QUESTIONS, payload};
  const action$ = ActionsObservable.from([input]);
  const get = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.get = get;

  getAllQuestions(action$)
    .subscribe((res) => {
      expect(get.mock.calls.length).toBe(1);
      expect(get.mock.calls[0][0]).toBe('http://localhost:8080/api/question');
      expect(get.mock.calls[0][1]).toEqual(headers);
      expect(res).toEqual({type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS, payload: {questions: response}});
    });
});

test('# questions epic - getAllQuestions error', () => {
  const input = {type: ActionTypes.GET_ALL_QUESTIONS, payload: {}};
  const action$ = ActionsObservable.from([input]);

  getAllQuestions(action$)
    .subscribe((res) => {
      expect(res.type).toBe(ActionTypes.GET_ALL_QUESTIONS_ERROR);
      expect(res.payload.error.AjaxError.message).toBe('ajax error');
    });
});

test('# questions epic - answerQuestion success', () => {
  const payload = {question: {id: 0}, answer: 'test'};
  const headers = {'x-access-token': undefined};
  const response = {user: 'dns'};
  const input = {type: ActionTypes.ANSWER_QUESTION, payload};
  const action$ = ActionsObservable.from([input]);
  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  answerQuestion(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(post.mock.calls.length).toBe(1);
        expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/question/0/answer');
        expect(post.mock.calls[0][1]).toEqual({answer: payload.answer});
        expect(post.mock.calls[0][2]).toEqual(headers);
        expect(res).toEqual({type: ActionTypes.ANSWER_QUESTION_SUCCESS, payload: response});
        responseCount += 1;
      } else {
        expect(res).toEqual({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: 0,
            text: 'Answer created with success!',
            alertType: 'info',
          },
        });
      }
    });
});

test('# questions epic - answerQuestion error', () => {
  const input = {type: ActionTypes.ANSWER_QUESTION, payload: {question: {id: 0}}};
  const action$ = ActionsObservable.from([input]);

  answerQuestion(action$)
    .subscribe((res) => {
      expect(res.type).toBe(ActionTypes.ANSWER_QUESTION_ERROR);
      expect(res.payload.error.AjaxError.message).toBe('ajax error');
    });
});

test('# questions epic - createQuestion success', () => {
  const payload = {question: {id: 0}, answer: 'test'};
  const headers = {'x-access-token': undefined};
  const response = {user: 'dns'};
  const input = {type: ActionTypes.ANSWER_QUESTION, payload};
  const action$ = ActionsObservable.from([input]);
  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  createQuestion(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(post.mock.calls.length).toBe(1);
        expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/question');
        expect(post.mock.calls[0][1]).toEqual(payload);
        expect(post.mock.calls[0][2]).toEqual(headers);
        expect(res).toEqual({type: ActionTypes.CREATE_QUESTION_SUCCESS, payload: response});
        responseCount += 1;
      } else {
        expect(res).toEqual({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: 1,
            text: 'Question created with success!',
            alertType: 'info',
          },
        });
      }
    });
});

test('# questions epic - createQuestion error', () => {
  const input = {type: ActionTypes.CREATE_QUESTION, payload: {}};
  const action$ = ActionsObservable.from([input]);

  createQuestion(action$)
    .subscribe((res) => {
      expect(res.type).toBe(ActionTypes.CREATE_QUESTION_ERROR);
      expect(res.payload.error.AjaxError.message).toBe('ajax error');
    });
});

test('# questions epic - deleteQuestion success', () => {
  const payload = {id: 0};
  const headers = {'x-access-token': undefined};
  const input = {type: ActionTypes.DELETE_QUESTION, payload};
  const action$ = ActionsObservable.from([input]);
  const del = jest.fn().mockReturnValueOnce(Observable.from([{}]));
  Observable.ajax.delete = del;

  let responseCount = 0;
  deleteQuestion(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(del.mock.calls.length).toBe(1);
        expect(del.mock.calls[0][0]).toBe('http://localhost:8080/api/question/0');
        expect(del.mock.calls[0][1]).toEqual(headers);
        expect(res).toEqual({type: ActionTypes.DELETE_QUESTION_SUCCESS, payload});
        responseCount += 1;
      } else {
        expect(res).toEqual({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: 2,
            text: 'Question deleted with success!',
            alertType: 'info',
          },
        });
      }
    });
});

test('# questions epic - deleteQuestion error', () => {
  const input = {type: ActionTypes.DELETE_QUESTION, payload: {id: 0}};
  const action$ = ActionsObservable.from([input]);

  deleteQuestion(action$)
    .subscribe((res) => {
      expect(res.type).toBe(ActionTypes.DELETE_QUESTION_ERROR);
      expect(res.payload.error.AjaxError.message).toBe('ajax error');
    });
});

test('# questions epic - updateQuestion success', () => {
  const payload = {id: 0};
  const headers = {'x-access-token': undefined};
  const response = {data: true};
  const input = {type: ActionTypes.UPDATE_QUESTION, payload};
  const action$ = ActionsObservable.from([input]);
  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  updateQuestion(action$)
    .subscribe((res) => {
      if (!responseCount) {
        expect(post.mock.calls.length).toBe(1);
        expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/question/0');
        expect(post.mock.calls[0][1]).toEqual(payload);
        expect(post.mock.calls[0][2]).toEqual(headers);
        expect(res).toEqual({type: ActionTypes.UPDATE_QUESTION_SUCCESS, payload: response});
        responseCount += 1;
      } else {
        expect(res).toEqual({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: 4,
            text: 'Question updated with success!',
            alertType: 'info',
          },
        });
      }
    });
});

test('# questions epic - updateQuestion error', () => {
  const input = {type: ActionTypes.UPDATE_QUESTION, payload: {id: 0}};
  const action$ = ActionsObservable.from([input]);

  updateQuestion(action$)
    .subscribe((res) => {
      expect(res.type).toBe(ActionTypes.UPDATE_QUESTION_ERROR);
      expect(res.payload.error.AjaxError.message).toBe('ajax error');
    });
});
