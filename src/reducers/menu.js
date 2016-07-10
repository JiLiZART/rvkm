import {handleActions} from 'redux-actions';

const defaultState = {visible: false};

export default handleActions({
  MENU_TOGGLE: (state) => {
    return Object.assign({}, state, {visible: !state.visible});
  },
  MENU_SHOW: (state) => {
    return Object.assign({}, state, {visible: true});
  },
  MENU_HIDE: (state) => {
    return Object.assign({}, state, {visible: false});
  }
}, defaultState);
