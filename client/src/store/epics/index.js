import {login, register} from './auth';
import {helloWorld} from './helloWorld';
import {getAllQuestions, answerQuestion} from './questions';

export default [
  // auth
  login,
  register,
  // hello world
  helloWorld,
  // questions
  getAllQuestions,
  answerQuestion,
];
