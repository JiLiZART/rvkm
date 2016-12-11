import {createStore, applyMiddleware, compose} from 'redux';
import {thunkMiddleware, promiseMiddleware, loggerMiddleware} from 'middlewares';

let finalCreateStore;

const middlewares = applyMiddleware(promiseMiddleware, thunkMiddleware, loggerMiddleware);

if (__DEVTOOLS__) {
  finalCreateStore = compose(
    middlewares,
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )(createStore);
} else {
  finalCreateStore = compose(
    middlewares
  )(createStore);
}

export default finalCreateStore;
