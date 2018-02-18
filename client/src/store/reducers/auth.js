// our packages
import * as ActionTypes from '../actionTypes';

const storedUser = localStorage.getItem('user.data');

// parse user from stored string
let user;
try {
  user = JSON.parse(storedUser);
} catch (e) {
  // console.error('Error parsing user data', e);
}

const initialState = {
  token: localStorage.getItem('user.token'),
  user,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_SUCCESS:
      return {
        redirectToLogin: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('user.token', action.payload.token);
      localStorage.setItem('user.data', JSON.stringify(action.payload.user));
      return {
        ...action.payload,
      };
    case ActionTypes.LOGIN_ERROR:
    case ActionTypes.REGISTER_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
