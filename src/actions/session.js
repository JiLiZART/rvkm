import { createAction } from 'redux-actions';
import Service from '../services';

const albums = require('./albums');
const groups = require('./groups');
const friends = require('./friends');

export const init = createAction('SESSION_INIT');
export const start = createAction('SESSION_START', session => session);

export function status() {
  return (dispatch) => {
    Service.User.status().then((session) => {
        dispatch(start(session));
        dispatch(albums.fetch(session.mid));
        dispatch(groups.fetch(session.mid));
        dispatch(friends.fetch(session.mid));
    }, console.error.bind(console))
  };
}

export const loginStart = createAction('SESSION_LOGIN_START');
export const loginSuccess = createAction('SESSION_LOGIN_SUCCESS');

export function login() {
  return (dispatch) => {
    dispatch(loginStart());

    Service.User.login().then((session) => {
      dispatch(loginSuccess());
      dispatch(start(session));
      dispatch(albums.fetch(session.mid));
      dispatch(groups.fetch(session.mid));
      dispatch(friends.fetch(session.mid));
    }, console.error.bind(console));
  };
}

export const logoutStart = createAction('SESSION_LOGOUT_START');
export const logoutSuccess = createAction('SESSION_LOGOUT_SUCCESS');

export function logout() {
  return (dispatch) => {
    dispatch(logoutStart());

    Service.User.logout().then(() => {
      dispatch(logoutSuccess());
    }, console.error.bind(console));
  };
}
