import {login, register} from './auth';
import {addNotification} from './notifications';
import {helloWorld} from './helloWorld';
import {getAllQuestions, answerQuestion, createQuestion} from './questions';

export default [
  // auth
  login,
  register,
  // notifications
  addNotification,
  // hello world
  helloWorld,
  // questions
  getAllQuestions,
  answerQuestion,
  createQuestion,
];
