import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const playerState = fromJS({
  current: {
    file: {url: ''},
    time: 0,
    duration: 0,
    playing: false,
    muted: false
  }
});

export default handleActions({
  PLAYER_LOAD: (state, action) => {
    return state.mergeDeep({
      current: {
        playing: true,
        file: action.payload,
        duration: action.payload.get('duration'),
        id: action.payload.get('id')
      }
    });
  },
  PLAYER_PLAY: (state, action) => {
    return state.mergeDeep({
      current: {
        playing: true
      }
    });
  },
  PLAYER_PAUSE: (state, action) => {
    return state.mergeDeep({
      current: {
        playing: false
      }
    });
  },
  PLAYER_PROGRESS: (state, action) => {
    let duration = state.getIn(['current', 'duration']);
    let time = duration - Math.round(action.payload.currentTime);

    return state.mergeDeep({
      current: {
        time: time
      }
    });
  },
  PLAYER_END: (state, action) => {
    return state.mergeDeep({
      current: {
        playing: false,
        time: 0,
        duration: 0
      }
    });
  },
  PLAYER_MUTE_TOGGLE: (state, action) => {
    return state.mergeDeep({
      current: {
        muted: !state.getIn(['current', 'muted'], true)
      }
    });
  }
}, playerState);
