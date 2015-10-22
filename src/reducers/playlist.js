import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const playlistState = fromJS({
  fetching: false,
  error: false,
  items: [],
  count: 0,
  id: 0,
  title: ''
});

export default handleActions({
  PLAYLIST_START: (state) => {
    return state.merge({
      fetching: true,
      error: false
    });
  },

  PLAYLIST_ERROR: (state, action) => {
    const { payload } = action;

    return state.mergeDeep({
      fetching: false,
      error: true,
      items: payload,
      count: payload.length
    });
  },

  PLAYLIST_SUCCESS: (state, action) => {
    const { payload } = action;

    return state.merge({
      fetching: false,
      error: false,
      items: payload.items,
      count: payload.count,
      id: payload.id,
      title: payload.title
    });
  }
}, playlistState);
