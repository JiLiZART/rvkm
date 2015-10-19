import { createAction } from 'redux-actions';
import { User } from 'services';

export const start = createAction('FRIENDS_START');
export const error = createAction('FRIENDS_ERROR');
export const success = createAction('FRIENDS_SUCCESS', (items = {}) => items);

export function fetch(userID) {
  return (dispatch) => {
    dispatch(start());

    User.getFriends(userID).then((items) => dispatch(success(items)), () => dispatch(error()));
  };
}
