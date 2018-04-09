/* global test expect shallow React */
// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import RegisterWrapper, {Register} from '../index';

// create mock store
const mockStore = configureMockStore();

test('# Register page wrapper', () => {
  const store = mockStore({auth: {redirectToLogin: false}});

  const wrapper = shallow(<RegisterWrapper store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Register page', () => {
  const newUser = {
    login: 'testuser',
    password: '123',
    passwordRepeat: '123',
  };
  const navToLogin = () => expect(true).toBeTruthy();
  const onRegisterClick = ({login, password, passwordRepeat}) => {
    expect(login).toBe(newUser.login);
    expect(password).toBe(passwordRepeat);
    expect(password).toBe(newUser.password);
    expect(passwordRepeat).toBe(newUser.passwordRepeat);
  };

  const component = (
    <Register
      onRegisterClick={onRegisterClick}
      navToLogin={navToLogin}
      redirectToLogin={false}
    />
  );

  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  const app = mount(component);
  app.find('#inputUsername').getDOMNode().value = newUser.login;
  app.find('#inputPassword').getDOMNode().value = newUser.password;
  app.find('#inputPasswordRepeat').getDOMNode().value = newUser.passwordRepeat;

  // click button
  app.find('button').simulate('click');
});
