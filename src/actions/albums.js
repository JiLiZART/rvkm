import { createAction } from 'redux-actions';
import Service from '../services';

const playlist = require('./playlist');

export const start = createAction('ALBUMS_START');
export const error = createAction('ALBUMS_ERROR');
export const success = createAction('ALBUMS_SUCCESS', (items = {}) => items);

export function fetch(userID) {
  return (dispatch) => {
    dispatch(start());

    Service.User.getAlbums(userID).then((items) => dispatch(success(items)), () => dispatch(error()));
  };
}
