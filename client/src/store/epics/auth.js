import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';

export const auth = action$ => action$
  .ofType(ActionTypes.DO_LOGIN)
  .switchMap(({payload}) => Observable
    .ajax.post('http://localhost:8080/api/login', payload)
    .map(res => res.response)
    .map(response => ({
      type: ActionTypes.LOGIN_SUCCESSS,
      payload: response,
    })));
