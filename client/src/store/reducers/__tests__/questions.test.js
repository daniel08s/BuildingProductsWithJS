/* global test expect */
import {questions} from '../questions';
import * as ActionTypes from '../../actionTypes';

const question = {
  id: 0,
  text: 'Test question',
};

test('# questions reducer - get all questions', () => {
  const testState = {};
  const action = {type: ActionTypes.GET_ALL_QUESTIONS};
  const res = questions(testState, action);
  expect(res.questions).toEqual([]);
  expect(res.status).toBe('loading');
});

test('# questions reducer - get questions success', () => {
  const testState = {};
  const action = {
    type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS,
    payload: {
      questions: [question],
    },
  };
  const res = questions(testState, action);
  expect(res.questions).toEqual(action.payload.questions);
  expect(res.status).toBe('done');
});

test('# questions reducer - answer question success', () => {
  const testState = {questions: [question]};
  const action = {
    type: ActionTypes.ANSWER_QUESTION_SUCCESS,
    payload: {
      id: question.id,
      text: 'New test question',
    },
  };
  const res = questions(testState, action);
  expect(res.state).toEqual(...testState);
  expect(res.questions.length).toBe(1);
  expect(res.questions[0].text).toEqual(action.payload.text);
});

test('# questions reducer - update question success', () => {
  const testState = {questions: [question]};
  const action = {
    type: ActionTypes.UPDATE_QUESTION_SUCCESS,
    payload: {
      id: question.id,
      text: 'New test question',
    },
  };
  const res = questions(testState, action);
  expect(res.state).toEqual(...testState);
  expect(res.questions.length).toBe(1);
  expect(res.questions[0].text).toEqual(action.payload.text);
});

test('# questions reducer - create question success', () => {
  const testState = {questions: []};
  const action = {
    type: ActionTypes.CREATE_QUESTION_SUCCESS,
    payload: {
      question,
    },
  };
  const res = questions(testState, action);
  expect(res.questions.length).toBe(1);
  expect(res.questions[0]).toEqual({question});
});

test('# questions reducer - delete question success', () => {
  const otherQuestion = {
    id: 1,
    text: 'Other test question',
  };
  const testState = {questions: [question, otherQuestion]};
  const action = {
    type: ActionTypes.DELETE_QUESTION_SUCCESS,
    payload: {
      id: question.id,
    },
  };
  const res = questions(testState, action);
  expect(res.questions).toEqual([{...otherQuestion}]);
});

test('# questions reducer - errors', () => {
  const testState = {questions: [question]};
  const action = {
    payload: {
      error: 'test error',
    },
  };
  expect(questions(testState, {...action, type: ActionTypes.ANSWER_QUESTION_ERROR}))
    .toEqual({
      ...testState,
      status: 'error',
      error: action.payload.error
  });
  expect(questions(testState, {...action, type: ActionTypes.GET_ALL_QUESTIONS_ERROR}))
    .toEqual({
      ...testState,
      status: 'error',
      error: action.payload.error
  });
  expect(questions(testState, {...action, type: ActionTypes.CREATE_QUESTION_ERROR}))
    .toEqual({
      ...testState,
      status: 'error',
      error: action.payload.error
  });
  expect(questions(testState, {...action, type: ActionTypes.DELETE_QUESTION_ERROR}))
    .toEqual({
      ...testState,
      status: 'error',
      error: action.payload.error
  });
  expect(questions(testState, {...action, type: ActionTypes.UPDATE_QUESTION_ERROR}))
      .toEqual({
      ...testState,
      status: 'error',
      error: action.payload.error
  });
  expect(questions(testState, {type: '-1'})).toEqual(testState);
});
