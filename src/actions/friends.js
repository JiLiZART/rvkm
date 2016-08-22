import {createAction} from 'redux-actions';
import Friends from 'models/Friends';
import {show} from './menu';

export const start = createAction('FRIENDS_FETCHING');
export const error = createAction('FRIENDS_ERROR');
export const load = createAction('FRIENDS', (r) => r);

export function fetch(userID) {
  return (dispatch) => {
    dispatch(start());
    return Friends.getById(userID, 0, 1000).then((r) => {
      dispatch(load(r));
      dispatch(show());
    }, () => dispatch(error()));
  };
}
