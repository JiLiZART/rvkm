import { createAction } from 'redux-actions';
import Service from '../services';

const session = require('./session');

export const init = createAction('APP_INIT', () => {
  return (dispatch) => {
    dispatch(session.init());
    dispatch(session.status());
  };
});
