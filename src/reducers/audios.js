import {handleActions} from 'redux-actions';
import Immutable from 'immutable';

const defaultState = Immutable.fromJS({fetching: false, error: false, id: NaN, title: '', items: null, count: 0, offset: 0});

export default handleActions({
  AUDIOS_FETCHING: (state, action) => state.merge({fetching: state.items === null, error: false}),

  AUDIOS: (state, action) => {
    const {payload: {id, items, count, offset}} = action;

    if (state.get('id') === id) {
      return state.merge({items: state.get('items').concat(items), count, offset})
    } else {
      return state.merge(action.payload);
    }
  },

  AUDIOS_ERROR: (state, action) => state.set('error', action.payload)
}, defaultState);
