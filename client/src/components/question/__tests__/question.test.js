/* global test expect shallow React */
// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import QuestionWrapper, {Question} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '1',
  login: 'testuser',
};

const question = {
  owner: user,
  text: 'Test question',
  answers: [{answer: 'Test answer'}],
};

test('# QuestionWrapper', () => {
  const store = mockStore({auth: {user}});

  const wrapper = shallow(<QuestionWrapper store={store} question={question} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Question', () => {
  const answer = 'Test answer';
  const updatedText = 'New test answer';
  const onAnswer = ({question: q, answer: a}) => {
    expect(q).toEqual(question);
    expect(a).toBe(answer);
  };
  const deleteQuestion = q => expect(q).toEqual(question);
  const updateQuestion = ({text}) => expect(text).toBe(updatedText);
  const component = (
    <Question
      user={user}
      question={question}
      onAnswer={onAnswer}
      deleteQuestion={deleteQuestion}
      updateQuestion={updateQuestion}
    />
  );
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // test interaction
  const app = mount(component);

  /* Test Answer */
  // set answer
  app.find('#answerInput').getDOMNode().value = answer;

  // click answer button
  app.find('#answerBtn').simulate('click');

  /* Test Delete */
  app.find('#deleteBtn').simulate('click');

  /* Test Update */
  // enable editing
  app.find('#editBtn').simulate('click');

  // update question
  app.find('#questionText').getDOMNode().value = updatedText;

  // click update button
  app.find('#updateBtn').simulate('click');
});
