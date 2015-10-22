
import thunkMiddleware from './thunkMiddleware';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

export {
  thunkMiddleware,
  promiseMiddleware,
  loggerMiddleware
};
