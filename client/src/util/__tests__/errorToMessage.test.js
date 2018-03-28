/* global test expect */
import {loginErrorToMessage, genericErrorToMessage} from '../errorToMessage';

test('# converts login error to message', () => {
  const message = 'Test message';

  expect(loginErrorToMessage({status: 401, message: 'test 401'})).toBe('Wrong login credentials. Please, try again.');
  expect(loginErrorToMessage({status: 0, message})).toBe(message);
});

test('# converts generic error to message', () => {
  const message = 'Test message';

  // error.response && error.response.error
  expect(genericErrorToMessage({
    status: 404,
    response: {
      error: message,
    },
  })).toBe(message);

  // error.status === 403
  expect(genericErrorToMessage({
    status: 403,
  })).toBe('Oops, something went wrong. Please, try again!');

  // just return message
  expect(genericErrorToMessage({status: 0, message})).toBe(message);
});
