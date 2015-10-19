import { createAction } from 'redux-actions';
import { User } from 'services';

export const start = createAction('GROUPS_START');
export const error = createAction('GROUPS_ERROR');
export const success = createAction('GROUPS_SUCCESS', (items = {}) => items);

export function fetch(userID) {
  return (dispatch) => {
    dispatch(start());

    User.getGroups(userID).then((items) => dispatch(success(items)), () => dispatch(error()));
  };
}
