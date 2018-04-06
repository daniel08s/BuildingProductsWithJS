/* global test expect shallow React */
import Notfound from '../index';

test('# Notfound', () => {
  const wrapper = shallow(<Notfound />);
  expect(wrapper).toMatchSnapshot();
});
