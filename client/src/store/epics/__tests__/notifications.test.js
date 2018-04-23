/* global test expect shallow jasmine */
import {ActionsObservable} from 'redux-observable';

import * as ActionTypes from '../../actionTypes';
import {addNotification} from '../notifications';

// increase test timeout to 6s
jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;

test('# notifications epic - add notification', (done) => {
  const payload = {id: 0};
  const action$ = ActionsObservable.from([{type: ActionTypes.ADD_NOTIFICATION, payload}]);

  addNotification(action$)
    .subscribe((res) => {
      expect(res).toEqual({
        type: 'REMOVE_NOTIFICATION',
        payload: {notificationId: 0},
      });
      done();
    });
});
