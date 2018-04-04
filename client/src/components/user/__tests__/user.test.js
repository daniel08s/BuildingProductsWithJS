/* global test expect shallow React */
// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import UserWrapper, {User} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '1',
  login: 'testuser',
  registrationDate: new Date(2018, 1, 1, 1, 1, 1, 1),
};

test('# UserWrapper', () => {
  const store = mockStore({auth: {user}});

  const wrapper = shallow(<UserWrapper user={user} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# User', () => {
  const newLogin = 'testuser new';
  const userUpdated = {
    id: '1',
    login: newLogin,
    registrationDate: new Date(2018, 1, 1, 1, 1, 1, 1),
  };
  const updateUser = u => expect(u).toEqual(userUpdated);
  const component = (
    <User
      user={user}
      edit
      handleUpdateUser={updateUser}
    />
  );
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // test interaction
  const app = mount(component);

  /* Test Answer */
  // set login
  app.find('#loginText').getDOMNode().value = newLogin;

  // click answer button
  app.find('#saveBtn').simulate('click');
});
