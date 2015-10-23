import { createStore, applyMiddleware, compose } from 'redux';
import { thunkMiddleware, promiseMiddleware } from 'middlewares';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';

let finalCreateStore;

const middlewares = applyMiddleware(promiseMiddleware, thunkMiddleware);
const router = reduxReactRouter({createHistory});

if (__DEVTOOLS__) {
  const { devTools } = require('redux-devtools');
  finalCreateStore = compose(
    middlewares,
    router,
    devTools()
  )(createStore);
} else {
  finalCreateStore = compose(
    middlewares,
    router
  )(createStore);
}

export default finalCreateStore;
