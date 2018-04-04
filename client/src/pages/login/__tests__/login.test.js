/* global test expect shallow React */
// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import LoginPage, {Login} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '1',
  login: 'testuser',
  registrationDate: new Date(2018, 1, 1, 1, 1, 1, 1),
};

const token = '0';

test('# LoginPage Wrapper ', () => {
  const store = mockStore({auth: {token}});

  const wrapper = shallow(<LoginPage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Login page', () => {
  const newUser = {
    login: 'testuser',
    password: '123',
    remember: true,
  };
  const onLoginClick = ({login, password, remember}) => {
    expect(login).toBe(newUser.login);
    expect(password).toBe(newUser.password);
    expect(remember).toBeTruthy();
  };
  const navToHome = () => expect(true).toBeTruthy();
  const component = (
    <Login
      token={token}
      onLoginClick={onLoginClick}
      navToHome={navToHome}
    />
  );

  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // mount for testing
  const app = mount(component);

  // test navHome
  app.find('#inputUsername').getDOMNode().value = newUser.login;
  app.find('#inputPassword').getDOMNode().value = newUser.password;
  app.find('#inputRemember').getDOMNode().checked = newUser.remember;

  // click button
  app.find('button').simulate('click');
});
