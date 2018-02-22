import {login, register} from './auth';
import {helloWorld} from './helloWorld';
import {getAllQuestions} from './questions';

export default [
  // auth
  login,
  register,
  // hello world
  helloWorld,
  // questions
  getAllQuestions,
];
