import * as ActionTypes from '../actionTypes';

const initialState = {questions: [], status: 'started'};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    // get questions logic
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
    case ActionTypes.ANSWER_QUESTION_ERROR:
    case ActionTypes.GET_ALL_QUESTIONS_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    // answer questions logic
    case ActionTypes.ANSWER_QUESTION_SUCCESS:
      state.questions[ // eslint-disable-line no-param-reassign
        state.questions.findIndex(q => q.id === action.payload.id)
      ] = action.payload;
      return state;
    default:
      return state;
  }
};
