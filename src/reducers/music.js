import { fromJS } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes.js';

const sessionState = fromJS({user: false});

export function session(state = sessionState, action = null) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SESSION_START:
      return state.merge(payload);
    default:
      return state;
  }
}

const playerState = fromJS({
  current: {
    file: {url: ''},
    time: 0,
    duration: 0,
    playing: false,
    muted: false
  }
});

export function player(state = playerState, action = null) {
  const { type, payload } = action;
  console.log('reducer.player', type, payload);
  switch (type) {
    case ActionTypes.PLAYER_LOAD:
      return state.mergeDeep({
        current: {
          playing: true,
          file: payload,
          duration: payload.get('duration'),
          id: payload.get('id')
        }
      });
    case ActionTypes.PLAYER_PLAY:
      return state.mergeDeep({
        current: {
          playing: true
        }
      });
    case ActionTypes.PLAYER_PAUSE:
      return state.mergeDeep({
        current: {
          playing: false
        }
      });
    case ActionTypes.PLAYER_PROGRESS:
      let duration = state.getIn(['current', 'duration']);
      let time = duration - Math.round(payload.currentTime);

      return state.mergeDeep({
        current: {
          time: time
        }
      });
    case ActionTypes.PLAYER_END:
      return state.mergeDeep({
        current: {
          playing: false,
          time: 0,
          duration: 0
        }
      });
    case ActionTypes.PLAYER_MUTE_TOGGLE:
      return state.mergeDeep({
        current: {
          muted: !state.getIn(['current', 'muted'], true)
        }
      });
    default:
      return state;
  }
}

const albumsState = fromJS({pending: true, user: {items: [], count: 0}});

export function albums(state = albumsState, action = null) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.ALBUMS_USER_PENDING:
      return state.merge({
        pending: true
      });
    case ActionTypes.ALBUMS_USER_RECEIVED:
      return state.mergeDeep({
        pending: false,
        user: {
          items: payload.user,
          count: payload.count
        }
      });
    case ActionTypes.PLAYLIST_USER_RECEIVED:
      let userAlbumsList = state.get('user').get('items', []).toJS();
      let albumFiles = payload.user.filter((audio) => audio.album_id);
      let items = userAlbumsList.map((album) => {
        album.count = albumFiles.filter((audio) => audio.album_id == album.id).length;
        return album;
      });
      return state.mergeDeep({
        user: {
          items: items
        }
      });
    default:
      return state;
  }
}

const playlistState = fromJS({pending: true, user: {files: [], count: 0, albums: {}}});

export function playlist(state = playlistState, action = null) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.PLAYLIST_USER_PENDING:
      return state.merge({
        pending: true
      });
    case ActionTypes.PLAYLIST_USER_RECEIVED:
      let userFiles = payload.user.filter((audio) => !audio.album_id);
      let albumFiles = payload.user.filter((audio) => audio.album_id);
      let albums = {};

      albumFiles
        .map((audio) => audio.album_id)
        .filter((albumID, idx, arr) => arr.indexOf(albumID) === idx)
        .forEach((albumID) => {
          albums[albumID] = albumFiles.filter((audio) => audio.album_id == albumID);
        });

      return state.mergeDeep({
        pending: false,
        user: {
          files: userFiles,
          count: payload.count,
          albums: albums
        }
      });
    default:
      return state;
  }
}
