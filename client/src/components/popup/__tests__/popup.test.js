/* global test expect shallow */
import Popup from '../index';

test('# Popup', () => {
  const wrapper = shallow(<Popup />);
  expect(wrapper).toMatchSnapshot();
});
