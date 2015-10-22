import { createAction } from 'redux-actions';
import { User } from 'services';

export const init = createAction('SESSION_INIT');
export const start = createAction('SESSION_START', session => session);

export const status = createAction('SESSION_STATUS', () => {
  return (dispatch) => {
    User.status().then((session) => {
      dispatch(start(session));
    }, console.error.bind(console));
  };
});

export const loginStart = createAction('SESSION_LOGIN_START');
export const loginSuccess = createAction('SESSION_LOGIN_SUCCESS');

export function login() {
  return (dispatch) => {
    dispatch(loginStart());

    User.login().then((session) => {
      dispatch(loginSuccess());
      dispatch(start(session));
    }, console.error.bind(console));
  };
}

export const logoutStart = createAction('SESSION_LOGOUT_START');
export const logoutSuccess = createAction('SESSION_LOGOUT_SUCCESS');

export const logout = createAction('SESSION_LOGOUT', () => {
  return (dispatch) => {
    dispatch(logoutStart());

    User.logout().then(() => {
      dispatch(logoutSuccess());
    }, console.error.bind(console));
  };
});
