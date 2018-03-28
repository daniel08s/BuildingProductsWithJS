/* global test expect shallow */
import App from '../index';

test('# App', () => {
  const wrapper = shallow(
    <App>Test</App>
  );
  expect(wrapper).toMatchSnapshot();
});
