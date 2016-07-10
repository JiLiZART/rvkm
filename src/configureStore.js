import {combineReducers} from 'redux';
import createStore from './createStore';

import * as reducers from 'reducers';

export default () => {
  const reducer = combineReducers(reducers);
  return createStore(reducer);
};

