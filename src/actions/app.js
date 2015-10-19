import { createAction } from 'redux-actions';

const session = require('./session');

export const init = createAction('APP_INIT', () => {
  return (dispatch) => {
    dispatch(session.init());
    dispatch(session.status());
  };
});
