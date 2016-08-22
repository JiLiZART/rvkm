import {handleActions} from 'redux-actions';
import {defaultState, FETCHING, SUCCESS, ERROR} from './base';

export default handleActions({
  ALBUMS_FETCHING: FETCHING,
  ALBUMS: SUCCESS,
  ALBUMS_ERROR: ERROR
}, defaultState);
