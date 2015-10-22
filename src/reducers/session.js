import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const defaultState = fromJS({user: false, mid: false});

export default handleActions({
  SESSION_INIT: (state) => {
    return state;
  },
  SESSION_START: (state, action) => {
    return state.merge(action.payload);
  },
  SESSION_LOGOUT_SUCCESS: (state) => {
    window.location.reload();
    return state;
  }
}, defaultState);
