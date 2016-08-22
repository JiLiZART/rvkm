import {handleActions} from 'redux-actions';

const defaultState = {id: false, fetching: false, error: false};

export default handleActions({
  USER_LOGIN_FETCHING: (state) => {
    return Object.assign({}, state, {fetching: true});
  },
  USER_LOGIN: (state, action) => {
    return Object.assign({}, state, action.payload, {fetching: false, error: false});
  },
  USER_LOGIN_ERROR: (state) => {
    return Object.assign({}, state, {error: true});
  },
  USER_LOGOUT: (state) => {
    window.location.reload();
    return state;
  }
}, defaultState);
