import { createAction } from 'redux-actions';
import Service from '../services';

const playlist = require('./playlist');

export const start = createAction('GROUPS_START');
export const error = createAction('GROUPS_ERROR');
export const success = createAction('GROUPS_SUCCESS', (items = {}) => items);

export function fetch(userID) {
  return (dispatch) => {
    dispatch(start());

    Service.User.getGroups(userID).then((items) => dispatch(success(items)), () => dispatch(error()));
  };
}
