import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const sessionState = fromJS({user: false});

export default handleActions({
  INIT: function(state, action) {
    return state;
  },
  SESSION_START: (state, action) => {
    return state.merge(action.payload);
  },
  USER_LOGOUT_SUCCESS: (state, action) => {
    window.location.reload();
    return state;
  }
}, sessionState);
