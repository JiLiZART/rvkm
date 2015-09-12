import { createAction } from 'redux-actions';
import Service from '../services/VK.js';
import Promise from 'bluebird';

export const playlistStart = createAction('PLAYLIST_START');
export const playlistSuccess = createAction('PLAYLIST_SUCCESS', function getPlaylistSuccess(items = [], count = 0) {
  return { items, count }
});

export function playlistFetch(userID) {
  return (dispatch) => {
    dispatch(playlistStart());

    Service.User.getPlaylist(userID).then((r) => {
      dispatch(playlistSuccess(r.items, r.count));
    });
  };
}

export const albumsStart = createAction('ALBUMS_START');
export const albumsSuccess = createAction('ALBUMS_SUCCESS', function getAlbumsSuccess(items = [], count = 0) {
  return { items, count };
});

export function albumsFetch(userID) {
  return (dispatch) => {
    dispatch(albumsStart());

    Service.User.getAlbums(userID).then((response) => {
      if (response.items) {
        dispatch(albumsSuccess(response.items, response.count));
        dispatch(playlistFetch(userID));
      }
    });
  };
}

export const vkInit = createAction('VK_INIT', () => {
  return (dispatch) => {
    dispatch(init());
    dispatch(sessionCheckStatus());
  };
});

export const init = createAction('INIT');
export const sessionStart = createAction('SESSION_START', session => session);

export const userLoginStart = createAction('USER_LOGIN_START');
export const userLoginSuccess = createAction('USER_LOGIN_SUCCESS');

export function userLogin() {
  return (dispatch) => {
    dispatch(userLoginStart());

    Service.User.login().then((session) => {
      dispatch(userLoginSuccess());

      dispatch(sessionStart(session));
      dispatch(albumsFetch(session.mid));
    }, console.error.bind(console));
  };
}

export const userLogoutStart = createAction('USER_LOGOUT_START');
export const userLogoutSuccess = createAction('USER_LOGOUT_SUCCESS');

export function userLogout() {
  return (dispatch) => {
    dispatch(userLogoutStart());

    Service.User.logout().then(() => {
      dispatch(userLogoutSuccess());
    }, console.error.bind(console));
  };
}

export function sessionCheckStatus() {
  return (dispatch) => {
    Service.User.sessionCheck().then((session) => {
        dispatch(sessionStart(session));
        dispatch(albumsFetch(session.mid));
    }, console.error.bind(console))
  };
}

export const playerLoad = createAction('PLAYER_LOAD', file => file);
export const playerPlay = createAction('PLAYER_PLAY');
export const playerPause = createAction('PLAYER_PAUSE');
export const playerProgress = createAction('PLAYER_PROGRESS', e => e);
export const playerNext = createAction('PLAYER_NEXT');
export const playerPrev = createAction('PLAYER_PREV');
export const playerMuteToggle = createAction('PLAYER_MUTE_TOGGLE');
export const playerEnd = createAction('PLAYER_END');
