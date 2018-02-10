// npm packages
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// our packages
import reducers from './reducers';

export default combineReducers({
  ...reducers,
  routing: routerReducer,
});
