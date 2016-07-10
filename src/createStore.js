import { createStore, applyMiddleware, compose } from 'redux';
import { thunkMiddleware, promiseMiddleware } from 'middlewares';

let finalCreateStore;

const middlewares = applyMiddleware(promiseMiddleware, thunkMiddleware);

if (__DEVTOOLS__) {
  finalCreateStore = compose(
    middlewares,
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )(createStore);
} else {
  finalCreateStore = compose(
    middlewares,
  )(createStore);
}

export default finalCreateStore;
