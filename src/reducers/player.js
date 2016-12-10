import {handleActions} from 'redux-actions';
import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  playing: false,
  position: null,
  sampleRate: '0',
  volume: 0,
  loop: false,
  shuffle: false,
  time: 0,
  progress: 0,
  buffer: 0,
  playlist: {fetching: false, error: false, items: [], count: 0, id: NaN, title: ''},
  inPlaylist: false,
  audio: {id: 0}
});

export default handleActions({
  PLAYER_INIT: (state, action) => state.merge(action.payload),

  PLAYER_SHUFFLE: (state) => state.set('shuffle', !state.get('shuffle')),

  PLAYER_LOOP: (state) => state.set('loop', !state.get('loop')),

  PLAYER_PLAYLIST: (state, action) => state.mergeDeep(action.payload, {fetching: false, error: false}),

  PLAYER_IN_PLAYLIST: (state) => state.set('inPlaylist', !state.get('inPlaylist')),

  PLAYER_LOAD: (state, action) => state.merge({audio: action.payload, volume: 100}),

  PLAYER_PLAY: (state) => state.set('playing', true),

  PLAYER_PAUSE: (state) => state.set('playing', false),

  PLAYER_END: (state) => state.merge({playing: false, time: 0, duration: 0}),

  PLAYER_VOLUME: (state, action) => state.set('volume', action.payload)
}, defaultState);
