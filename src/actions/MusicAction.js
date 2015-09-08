import {
  VK_INIT,
  SESSION_START,
  USER_LOGOUT_SUCCESS,

  PLAYLIST_USER_RECEIVED,
  PLAYLIST_USER_PENDING,

  ALBUMS_USER_RECEIVED,
  ALBUMS_USER_PENDING,

  PLAYER_PLAY,
  PLAYER_PAUSE,

  PLAYER_PROGRESS,
  PLAYER_NEXT,
  PLAYER_PREV,
  PLAYER_LOAD,
  PLAYER_MUTE_TOGGLE,
  PLAYER_END
} from '../constants/ActionTypes';

const API_VERSION = '5.37';

export function playlistUserReceived(items = [], count = 0) {
  return {
    type: PLAYLIST_USER_RECEIVED,
    payload: {
      user: items,
      count
    }
  };
}

export function playlistUserPending() {
  return {
    type: PLAYLIST_USER_PENDING
  };
}

export function playlistUser(userID) {
  return (dispatch) => {
    dispatch(playlistUserPending());

    VK.Api.call('audio.get', {
      v: API_VERSION,
      owner_id: userID
    }, (r) => {
      if (r.response && r.response.items) {
        dispatch(playlistUserReceived(r.response.items, r.response.count));
      }
    });
  };
}

export function albumsUserReceived(items = [], count = 0) {
  return {
    type: ALBUMS_USER_RECEIVED,
    payload: {
      user: items,
      count
    }
  }
}

export function albumsUserPending() {
  return {
    type: ALBUMS_USER_PENDING
  };
}

export function albumsUser(userID) {
  return (dispatch) => {
    dispatch(albumsUserPending());

    VK.Api.call('audio.getAlbums', {
      v: API_VERSION,
      owner_id: userID
    }, (r) => {
      if (r.response && r.response.items) {
        dispatch(albumsUserReceived(r.response.items, r.response.count));
        dispatch(playlistUser(userID));
      }
    });
  };
}

export function vkInit(instance) {
  return (dispatch) => {
    dispatch(init());
    dispatch(sessionCheckStatus());
  };
}

export function init() {
  return {
    type: VK_INIT
  };
}

export function sessionStart(session) {
  return {
    type: SESSION_START,
    payload: session
  };
}

export function userLogin() {
  return (dispatch) => {
    VK.Auth.login((response) => {
      if (response.session) {
        dispatch(sessionStart(response.session));
        dispatch(albumsUser(response.session.mid));
      }
    }, VK.access.AUDIO);
  };
}

export function userLogout() {
  return (dispatch) => {
    VK.Auth.logout((response) => {
      dispatch(userLogoutSuccess());
      window.location.reload();
    });
  };
}

export function userLogoutSuccess() {
  return {
    type: USER_LOGOUT_SUCCESS
  }
}

export function sessionCheckStatus() {
  return (dispatch) => {
    VK.Auth.getLoginStatus((response) => {
      if (response.session) {
        dispatch(sessionStart(response.session));
        dispatch(albumsUser(response.session.mid));
      }
    })
  };
}

export function playerLoad(file) {
  console.log('playerLoad(file)', file);
  return {
    type: PLAYER_LOAD,
    payload: file
  };
}

export function playerPlay() {
  return {
    type: PLAYER_PLAY
  };
}

export function playerPause() {
  return {
    type: PLAYER_PAUSE
  };
}

export function playerProgress(e) {
  return {
    type: PLAYER_PROGRESS,
    payload: e
  };
}

export function playerNext() {
  return {
    type: PLAYER_NEXT
  };
}

export function playerPrev() {
  return {
    type: PLAYER_PREV
  };
}

export function playerMuteToggle() {
  return {
    type: PLAYER_MUTE_TOGGLE
  };
}

export function playerEnd() {
  return {
    type: PLAYER_END
  };
}
