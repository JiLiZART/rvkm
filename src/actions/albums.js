import { createAction } from 'redux-actions';
import { User } from 'services';

export const start = createAction('ALBUMS_START');
export const error = createAction('ALBUMS_ERROR');
export const success = createAction('ALBUMS_SUCCESS', (items = {}) => items);

const playlist = require('./playlist');

export function load(album) {
  return (dispatch) => {
    dispatch(playlist.start());
    dispatch(playlist.load(album));
  };
}

export function fetch(userID) {
  return (dispatch) => {
    dispatch(start());

    User.getAlbums(userID).then((items) => dispatch(success(items)), () => dispatch(error()));
  };
}
