import {handleActions} from 'redux-actions';
import {defaultState, FETCHING, SUCCESS, ERROR} from './base';

export default handleActions({
  GROUPS_FETCHING: FETCHING,
  GROUPS: SUCCESS,
  GROUPS_ERROR: ERROR
}, defaultState);
