import {createAction} from 'redux-actions';
import AudioPlayer from 'models/AudioPlayer';
import Audio from 'models/Audio';

export const playlist = createAction('PLAYER_PLAYLIST', (item) => item);

export const initSuccess = createAction('PLAYER_INIT', (data) => data);

export const loadStart = createAction('PLAYER_LOAD_FETCHING', (file) => file);
export const loadSuccess = createAction('PLAYER_LOAD', (file) => file);
export const loadError = createAction('PLAYER_LOAD_ERROR');
export const seekSuccess = createAction('PLAYER_SEEK', (pos) => pos);
export const play = createAction('PLAYER_PLAY');
export const pause = createAction('PLAYER_PAUSE');
export const nextSuccess = createAction('PLAYER_NEXT', (player) => player);
export const prevSuccess = createAction('PLAYER_PREV', (player) => player);
export const progress = createAction('PLAYER_PROGRESS', (value) => value);
export const volume = createAction('PLAYER_VOLUME', (value) => value);
export const shuffleToggle = createAction('PLAYER_SHUFFLE', (value) => value);
export const loopToggle = createAction('PLAYER_LOOP', (value) => value);
export const playlistToggle = createAction('PLAYER_IN_PLAYLIST', (value) => value);
export const end = createAction('PLAYER_END');

export function init() {
  return (dispatch) => {
    dispatch(initSuccess({
      volume: AudioPlayer.getVolume(),
      sampleRate: AudioPlayer.getSampleRate()
    }));
  };
}

export function load(audio) {
  return (dispatch) => {
    dispatch(loadStart(audio));
    Audio.loadFromUrl(audio).then((item) => {
      dispatch(loadSuccess(item));
    }, (err) => dispatch(loadError(err)));
  };
}

export function loadAndPlay(audio) {
  return (dispatch) => {
    dispatch(loadStart(audio));
    Audio.loadFromUrl(audio).then((item) => {
      dispatch(loadSuccess(item));
      dispatch(play());
    }, (err) => dispatch(loadError(err)));
  };
}

// export function play() {
//   return (dispatch) => {
//     dispatch(playSuccess());
//   };
// }
//
// export function volume(value) {
//   return (dispatch) => {
//     dispatch(volumeSuccess(value));
//   };
// }
//
// export function pause() {
//   return (dispatch) => {
//     dispatch(pauseSuccess());
//   };
// }

export function next(audio) {
  return (dispatch) => {
    dispatch(loadAndPlay(audio));
    dispatch(nextSuccess());
  };
}

export function prev(audio) {
  return (dispatch) => {
    dispatch(loadAndPlay(audio));
    dispatch(prevSuccess());
  };
}

export function mute() {
  return (dispatch) => {
    dispatch(volume(0));
  };
}

export function max() {
  return (dispatch) => {
    dispatch(volume(100));
  };
}

export function seek(value) {
  return (dispatch) => {
    AudioPlayer.seek(value);
    dispatch(seekSuccess(value));
  };
}
