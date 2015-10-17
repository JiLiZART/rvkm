import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const playlistState = fromJS({
  pending: false,
  items: [],
  count: 0,
  id: 0,
  title: ''
});

export default handleActions({
  PLAYLIST_START: (state, action) => {
    return state.merge({
      pending: true
    });
  },
  PLAYLIST_LOAD: (state, action) => {
    const { payload } = action;

    return state.merge({
      pending: false,
      items: payload.items,
      count: payload.count,
      id: payload.id,
      title: payload.title
    });
  }
}, playlistState);
