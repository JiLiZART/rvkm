import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const defaultState = fromJS({
  playing: false,
  position: null,
  volume: 0,
  time: 0,
  progress: 0,
  buffer: 0,
  duration: 0,
  id: 0,
  file: null
});

export default handleActions({
  PLAYER_LOAD: (state, action) => {
    const { payload } = action;

    return state.merge({
      playing: true,
      file: payload,
      duration: payload.duration,
      id: payload.id
    });
  },
  PLAYER_SEEK: (state, action) => {
    return state.merge({
      position: action.payload
    });
  },
  PLAYER_SEEK_END: (state) => {
    return state.merge({
      position: null
    });
  },
  PLAYER_PLAY: (state) => {
    return state.merge({
      playing: true
    });
  },
  PLAYER_PAUSE: (state) => {
    return state.merge({
      playing: false
    });
  },
  PLAYER_END: (state) => {
    return state.merge({
      playing: false,
      time: 0,
      duration: 0
    });
  },
  PLAYER_VOLUME: (state, action) => {
    const { payload } = action;

    return state.merge({
      volume: payload
    });
  },
  PLAYER_PROGRESS: (state, action) => {
    const { payload } = action;

    return state.merge({
      time: payload.time,
      progress: payload.progress,
      buffer: payload.buffer
    });
  }
}, defaultState);
