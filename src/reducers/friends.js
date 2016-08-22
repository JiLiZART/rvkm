import {handleActions} from 'redux-actions';
import {defaultState, FETCHING, SUCCESS, ERROR} from './base';

export default handleActions({
  FRIENDS_FETCHING: FETCHING,
  FRIENDS: SUCCESS,
  FRIENDS_ERROR: ERROR
}, defaultState);
