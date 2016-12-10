import {createStore, applyMiddleware, compose} from 'redux';
import {thunkMiddleware, promiseMiddleware, loggerMiddleware} from 'middlewares';
import {autoRehydrate} from 'redux-persist';

let finalCreateStore;

const middlewares = applyMiddleware(promiseMiddleware, thunkMiddleware, loggerMiddleware);

if (__DEVTOOLS__) {
  finalCreateStore = compose(
    middlewares,
    autoRehydrate(),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )(createStore);
} else {
  finalCreateStore = compose(
    middlewares,
    autoRehydrate(),
  )(createStore);
}

export default finalCreateStore;
