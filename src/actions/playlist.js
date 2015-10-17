import { createAction } from 'redux-actions';
import Service from '../services';

export const start = createAction('PLAYLIST_START');
export const load = createAction('PLAYLIST_LOAD', item => item);
export const success = createAction('PLAYLIST_SUCCESS', (items = [], count = 0) => {
  return {items, count}
});

export function fetch(userID) {
  return (dispatch) => {
    dispatch(start());

    Service.User.getPlaylist(userID).then((r) => {
      dispatch(success(r.items, r.count));
    });
  };
}
