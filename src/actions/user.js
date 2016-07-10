import {createAction} from 'redux-actions';
import User from 'models/User';
export const loginSuccess = createAction('USER_LOGIN', (user) => user);
export const loginFetching = createAction('USER_LOGIN_FETCHING');
export const loginError = createAction('USER_LOGIN_ERROR', (r) => r);

export const statusFetching = createAction('USER_STATUS_FETCHING');
export const statusError = createAction('USER_STATUS_ERROR', (r) => r);

export const logoutFetching = createAction('USER_LOGOUT_FETCHING');
export const logoutSuccess = createAction('USER_LOGOUT');
export const logoutError = createAction('USER_LOGOUT_ERROR', (r) => r);

export function status() {
  return (dispatch) => {
    const error = (r) => dispatch(statusError(r));
    dispatch(statusFetching());
    return User.status().then((session) => {
      if (!session) error();

      User.getByIDs([session.mid]).then((items) => {
        if (items[0]) dispatch(loginSuccess(items[0]))
      }, error);
    }, error);
  }
}

export function login() {
  return (dispatch) => {
    const error = (r) => dispatch(loginError(r));
    dispatch(loginFetching());
    return User.login().then((session) => {
      if (!session) error();

      User.getByIDs([session.mid]).then((items) => {
        if (items[0]) dispatch(loginSuccess(items[0]))
      }, error);
    }, error);
  }
}

export function logout() {
  return (dispatch) => {
    dispatch(logoutFetching());
    return User.logout().then(() => dispatch(logoutSuccess()), (r) => dispatch(statusError(r)));
  }
}
