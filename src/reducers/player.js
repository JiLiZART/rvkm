import {handleActions} from 'redux-actions';

const defaultState = {
  playing: false,
  position: null,
  volume: 0,
  time: 0,
  progress: 0,
  buffer: 0,
  playlist: {fetching: false, error: false, items: [], count: 0, id: NaN, title: ''},
  audio: {id: 0}
};

export default handleActions({
  PLAYER_INIT: (state, action) => {
    return Object.assign(state, action.payload);
  },
  PLAYER_PLAYLIST: (state, action) => {
    state.playlist = Object.assign({}, state.playlist, action.payload, {fetching: false, error: false});

    return state;
  },

  PLAYER_LOAD: (state, action) => {
    return Object.assign({}, state, {audio: action.payload, volume: 100});
  },
  PLAYER_PLAY: (state) => {
    return Object.assign({}, state, {playing: true});
  },
  PLAYER_PAUSE: (state) => {
    return Object.assign({}, state, {playing: false});
  },

  PLAYER_END: (state) => {
    return Object.assign({}, state, {playing: false, time: 0, duration: 0});
  },

  PLAYER_SEEK: (state, action) => {
    return Object.assign({}, state, {position: action.payload});
  },
  PLAYER_SEEK_END: (state) => {
    return Object.assign({}, state, {position: null});
  },
  PLAYER_VOLUME: (state, action) => {
    return Object.assign({}, state, {volume: action.payload});
  },
  PLAYER_PROGRESS: (state, action) => {
    const {time, progress, buffer} = action.payload;

    return {...state, time, progress, buffer};
  }
}, defaultState);