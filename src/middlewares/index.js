
import thunkMiddleware from './thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

export {
  thunkMiddleware,
  promiseMiddleware,
  loggerMiddleware
};
