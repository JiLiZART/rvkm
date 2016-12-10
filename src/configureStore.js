import {combineReducers} from 'redux';
import createStore from './createStore';
import {persistStore} from 'redux-persist'
import localForage from 'localforage'
import immutableTransform from 'redux-persist-transform-immutable'
import * as reducers from 'reducers';

const state = {};

export default (afterRehydrate) => {
  const reducer = combineReducers(reducers);
  const store = createStore(reducer, state);

  persistStore(store, {storage: localForage, transforms: [immutableTransform()]}, afterRehydrate);

  return store;
};

