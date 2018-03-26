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
    case ActionTypes.ANSWER_QUESTION_SUCCESS: {
      const newQuestions = state.questions.map(q => (q.id === action.payload.id ? action.payload : q));
      return {...state, questions: newQuestions};
    }
    case ActionTypes.CREATE_QUESTION_SUCCESS: {
      state.questions.push(action.payload);
      return state;
    }
    case ActionTypes.DELETE_QUESTION_SUCCESS: {
      const newQuestions = state.questions.filter(q => q.id !== action.payload.id);
      return {...state, questions: newQuestions};
    }
    case ActionTypes.UPDATE_QUESTION_SUCCESS: {
      const newQuestions = state.questions.map(q => q.id === action.payload.id ? {...action.payload, owner: q.owner} : q);
      return {...state, questions: newQuestions};
    }
    case ActionTypes.ANSWER_QUESTION_ERROR:
    case ActionTypes.GET_ALL_QUESTIONS_ERROR:
    case ActionTypes.CREATE_QUESTION_ERROR:
    case ActionTypes.DELETE_QUESTION_ERROR:
    case ActionTypes.UPDATE_QUESTION_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    default:
      return state;
  }
};
