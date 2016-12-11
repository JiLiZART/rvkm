import {combineReducers} from 'redux';
import createStore from './createStore';

import * as reducers from 'reducers';

const state = {};

export default () => {
  const reducer = combineReducers(reducers);
  return createStore(reducer, state);
};
