/* global test expect */
import {requireAuth} from '../requireAuth';

test('# forces to login if not already', () => {
  requireAuth({location: {pathname: 'test'}}, ((obj) => {
    expect(obj.pathname).toBe('/login');
    expect(obj.state.nextPathname).toBe('test');
  }));
});
