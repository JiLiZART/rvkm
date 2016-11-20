import {createAction} from 'redux-actions';
import AudioPlayer from 'models/AudioPlayer';
import Audio from 'models/Audio';

export const playlist = createAction('PLAYER_PLAYLIST', (item) => item);

export const initSuccess = createAction('PLAYER_INIT', (data) => data);

export const loadStart = createAction('PLAYER_LOAD_FETCHING');
export const loadSuccess = createAction('PLAYER_LOAD', (file) => file);
export const loadError = createAction('PLAYER_LOAD_ERROR');
export const seekSuccess = createAction('PLAYER_SEEK', (pos) => pos);
export const playSuccess = createAction('PLAYER_PLAY');
export const pauseSuccess = createAction('PLAYER_PAUSE');
export const nextSuccess = createAction('PLAYER_NEXT', (player) => player);
export const prevSuccess = createAction('PLAYER_PREV', (player) => player);
export const progress = createAction('PLAYER_PROGRESS', (value) => value);
export const volumeSuccess = createAction('PLAYER_VOLUME', (value) => value);
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

function loadFromUrl(audio, done) {
  Audio.getById(audio.id, audio.owner_id).then((items) => {
    if (Array.isArray(items) && items.length) {
      const item = items[0];

      AudioPlayer.loadFromUrl(item.url).then(() => {
        done(item);
      });
    }
  });
}

export function load(audio) {
  return (dispatch) => {
    loadFromUrl(audio, (item) => {
      dispatch(loadSuccess(item));
    });
  };
}

export function loadAndPlay(audio) {
  return (dispatch) => {
    loadFromUrl(audio, (item) => {
      dispatch(loadSuccess(item));
      dispatch(play());
    });
  };
}

export function play() {
  return (dispatch) => {
    AudioPlayer.play();
    dispatch(playSuccess());
  };
}

export function volume(value) {
  return (dispatch) => {
    AudioPlayer.volume(value);
    dispatch(volumeSuccess(value));
  };
}

export function pause() {
  return (dispatch) => {
    AudioPlayer.pause();
    dispatch(pauseSuccess());
  };
}

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
