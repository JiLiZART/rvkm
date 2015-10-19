import { createAction } from 'redux-actions';
import { User } from 'services';

export const start = createAction('FRIENDS_START');
export const error = createAction('FRIENDS_ERROR');
export const success = createAction('FRIENDS_SUCCESS', (items = {}) => items);

const playlist = require('./playlist.js');

export function load(friend) {
  return (dispatch) => {
    console.log('friends load', friend);
    dispatch(playlist.start());

    User.getFriendAudio(friend.id).then((items) => {
      dispatch(success(items));
      dispatch(playlist.load(items[friend.id]));
    }, () => dispatch(playlist.error()));
  };
}

export function fetch(userID) {
  return (dispatch) => {
    dispatch(start());

    User.getFriends(userID).then((items) => dispatch(success(items)), () => dispatch(error()));
  };
}
