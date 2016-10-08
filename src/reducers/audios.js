import {handleActions} from 'redux-actions';

const defaultState = {fetching: false, error: false, items: null, count: 0, id: NaN, title: ''};

export default handleActions({
  AUDIOS_FETCHING: (state) => {
    return Object.assign({}, state, {fetching: state.items === null, error: false});
  },

  AUDIOS: (state, action) => {
    return Object.assign({}, state, action.payload, {fetching: false, error: false});
  },

  AUDIOS_MORE: (state, action) => {
    state.items = [...state.items, ...action.payload];

    return state;
  },

  AUDIOS_ERROR: (state, action) => {
    return Object.assign({}, state, {error: action.payload});
  }
}, defaultState);
