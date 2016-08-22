import { createAction } from 'redux-actions';
import Audio from 'models/Audio';
import {show} from './menu';

export const start = createAction('ALBUMS_FETCHING');
export const error = createAction('ALBUMS_ERROR');
export const load = createAction('ALBUMS', (r) => r);

export function fetch(userID) {
  return (dispatch) => {
    dispatch(start());
    return Audio.getAlbums(userID, 0, 100).then((r) => {
      dispatch(load(r));
      dispatch(show());
    }, () => dispatch(error()));
  };
}
