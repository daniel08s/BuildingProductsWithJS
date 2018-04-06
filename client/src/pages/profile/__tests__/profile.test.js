/* global test expect shallow React */
// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import ProfileWrapper, {Profile} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '1',
  login: 'testuser',
  registrationDate: new Date(2018, 1, 1, 1, 1, 1, 1),
};

test('# Profile page wrapper', () => {
  const store = mockStore({auth: {user}, users: {user}});

  const wrapper = shallow(<ProfileWrapper store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Profile page', () => {
  const getUser = (u) => {
    expect(u).toEqual(user);
  };
  const component = (
    <Profile
      user={user}
      loadedUser={user}
      getUser={getUser}
      params={user}
    />
  );

  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();
});
