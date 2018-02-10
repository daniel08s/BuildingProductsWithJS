// npm packages
import {combineEpics} from 'redux-observable';

// our packages
import epics from './epics';

export default combineEpics(...epics);
