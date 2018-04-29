// npm packages
import {Observable} from 'rxjs/Observable';
import {push} from 'react-router-redux';

// our packages
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {loginErrorToMessage, genericErrorToMessage} from '../../util/errorToMessage';

// ASCII diagram for Rx Streams (see: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

/** Success login:
 *  --(DO_LOGIN|)
 *        switchMap(credentials => ajax)
 *  -------------(token|)
 *        mergeMap
 *  -------------(LOGIN_SUCCESS with token|)
 *        concat
 *  -------------(ADD_NOTIFICATION with login success|)

 *  Failed login:
 *  --(DO_LOGIN|)
 *        switchMap(credentials => ajax)
 *  -------------(X|)
 *        catch
 *  -------------(LOGIN_ERROR, ADD_NOTIFICATION with login error|)
 */
export const login = action$ => action$
  .ofType(ActionTypes.DO_LOGIN)
  .switchMap(({payload}) => Observable
    .ajax.post(`${API_HOST}/api/login`, payload)
    .map(res => res.response)
    .mergeMap(response => Observable.merge(
      Observable.of(
        {
          type: ActionTypes.LOGIN_SUCCESS,
          payload: response,
        },
        Actions.addNotificationAction({
          text: 'Login successful!',
          alertType: 'info',
        }),
      ),
      Observable.timer(0)
        .map(() => push('/'))
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.LOGIN_ERROR,
        payload: {
          error,
        },
      },
      Actions.addNotificationAction({text: loginErrorToMessage(error), alertType: 'danger'}),
    )));

// Similar to login
export const register = action$ => action$
  .ofType(ActionTypes.DO_REGISTER)
  .switchMap(({payload}) => Observable
    .ajax.post(`${API_HOST}/api/register`, payload)
    .map(res => res.response)
    .mergeMap(response => Observable.merge(
      Observable.of(
        {
          type: ActionTypes.REGISTER_SUCCESS,
          payload: response,
        },
        Actions.addNotificationAction({
          text: 'Registration successful!',
          alertType: 'info',
        }),
      ),
      Observable.timer(0)
        .map(() => push('/login'))
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.REGISTER_ERROR,
        payload: {
          error,
        },
      },
      Actions.addNotificationAction({text: genericErrorToMessage(error), alertType: 'danger'}),
    )));
