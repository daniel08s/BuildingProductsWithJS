/* global test expect shallow React */
// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import HomePage, {Home} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '1',
  login: 'testuser',
  registrationDate: new Date(2018, 1, 1, 1, 1, 1, 1),
};

test('# HomePage', () => {
  const store = mockStore({auth: {user}, questions: {questions: []}});

  const wrapper = shallow(<HomePage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Home', () => {
  const questions = [];
  const fetchQuestions = () => {
    questions.push({
      id: 1,
      owner: user,
      text: 'Test question',
      answers: [{answer: 'Test answer'}],
    });
  };
  const doAnswer = () => {};
  const component = (
    <Home
      user={user}
      questions={questions}
      fetchQuestions={fetchQuestions}
      doAnswer={doAnswer}
    />
  );
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();
});
