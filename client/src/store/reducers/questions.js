import * as ActionTypes from '../actionTypes';

const initialState = {questions: [], status: 'started'};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_QUESTIONS:
      return {
        questions: [],
        status: 'loading',
      };
    case ActionTypes.GET_ALL_QUESTIONS_SUCCESS:
      return {
        questions: action.payload.questions,
        status: 'done',
      };
    case ActionTypes.GET_ALL_QUESTIONS_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    default:
      return state;
  }
};
