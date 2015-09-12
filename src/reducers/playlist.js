import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const playlistState = fromJS({
  pending: true, albums: {0: []}, count: 0, current: {id:0}
});

export default handleActions({
  PLAYLIST_START: (state, action) => {
    return state.merge({
      pending: true
    });
  },
  PLAYLIST_SUCCESS: (state, action) => {
    let noAlbumFiles = action.payload.items.filter((audio) => !audio.album_id);
    let albumFiles = action.payload.items.filter((audio) => audio.album_id);
    let albums = {
      0: {
        files: noAlbumFiles,
        count: noAlbumFiles.length
      }
    };

    albumFiles
      .map((audio) => audio.album_id)
      .filter((albumID, idx, arr) => arr.indexOf(albumID) === idx)
      .forEach((albumID) => {
        let files = albumFiles.filter((audio) => audio.album_id == albumID);
        albums[albumID] = {
          files,
          count: files.length
        };
      });

    return state.mergeDeep({
      pending: false,
      count: action.payload.count,
      albums: albums,
      current: albums[state.getIn(['current', 'id'])]
    });
  }
}, playlistState);
