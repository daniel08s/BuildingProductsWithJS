import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {signRequest, genericErrorToMessage} from '../../util';

export const getUser = action$ => action$
  .ofType(ActionTypes.GET_USER)
  .map(signRequest)
  .switchMap(({payload, headers}) => Observable
    .ajax.get(`http://localhost:8080/api/user/${payload.id}`, headers)
    .map(res => res.response)
    .map(user => ({
      type: ActionTypes.GET_USER_SUCCESS,
      payload: {user},
    }))
    .catch(error => Observable.of({
      type: ActionTypes.GET_USER_ERROR,
      payload: {error},
    })));

export const updateUser = action$ => action$
  .ofType(ActionTypes.UPDATE_USER)
  .map(signRequest)
  .switchMap(({payload, headers}) => Observable
    .ajax.post(`http://localhost:8080/api/user/${payload.id}`, payload, headers)
    .map(res => res.response)
    .map(user => ({
      type: ActionTypes.UPDATE_USER_SUCCESS,
      payload: {user},
    }))
    .concat(Observable.of(Actions.addNotificationAction({
      text: 'User updated with success!',
      alertType: 'info',
    })))
    .catch(error => Observable.of(
      {
        type: ActionTypes.UPDATE_USER_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction({text: genericErrorToMessage(error), alertType: 'danger'}),
    )));
