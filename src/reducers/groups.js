import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const defaultState = fromJS({
  fetching: false,
  error: false,
  items: {},
  count: 0
});

export default handleActions({
  GROUPS_START: (state) => {
    return state.merge({
      fetching: true
    });
  },
  GROUPS_SUCCESS: (state, action) => {
    const { payload } = action;

    return state.mergeDeep({
      fetching: false,
      error: false,
      items: payload
    });
  },
  GROUPS_ERROR: (state) => {
    return state.merge({
      fetching: false,
      error: true
    });
  }
}, defaultState);
