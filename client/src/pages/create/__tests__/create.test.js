/* global test expect shallow React */
// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import CreatePage, {Create} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '1',
  login: 'testuser',
  registrationDate: new Date(2018, 1, 1, 1, 1, 1, 1),
};

test('# CreatePage', () => {
  const store = mockStore({auth: {user}});

  const wrapper = shallow(<CreatePage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Create', () => {
  const newText = 'This is a test question, right?';
  // const newExpirationDate = new Date(2018, 1, 1, 1, 1, 1, 1);
  const doCreateQuestion = ({text}) => { // TODO: add expiration date
    expect(text).toBe(newText);
    // expect(expirationDate).toBe(newExpirationDate.toISOString());
  };

  const component = (
    <Create
      user={user}
      doCreateQuestion={doCreateQuestion}
    />
  );
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // test interaction
  const app = mount(component);

  /* Test Create Question */
  app.find('#questionText').getDOMNode().value = newText;
  // app.find('#expirationDate').getDOMNode().value = newExpirationDate.toISOString();

  // click create button
  app.find('button').simulate('click');
});
