/* global test expect shallow React */
import Popup from '../index';

test('# Popup', () => {
  const wrapper = shallow(<Popup />);
  expect(wrapper).toMatchSnapshot();
});
