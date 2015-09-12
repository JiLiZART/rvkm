import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const albumsState = fromJS({
  pending: true, items: {}, count: 0, current: {id:0}
});

export default handleActions({
  ALBUMS_START: (state, action) => {
    return state.merge({
      pending: true
    });
  },
  ALBUMS_SUCCESS: (state, action) => {
    let albums = {
      0: {
        id: 0,
        title: 'Other'
      }
    };

    action.payload.items.forEach((album) => {
      albums[album.id] = album;
    });

    return state.mergeDeep({
      pending: false,
      items: albums,
      count: action.payload.count + 1,
      current: albums[state.getIn(['current', 'id'])]
    });
  },
  PLAYLIST_SUCCESS: (state, action) => {
    let albums = state.toJS();
    let albumFiles = action.payload.items.filter((audio) => audio.album_id);

    albums.items[0].count = action.payload.items.length - albumFiles.length;
    Object.keys(albums.items).map((key) => {
      albums.items[key].count = albumFiles
        .filter((audio) => audio.album_id == albums.items[key].id).length;
    });
    return state.mergeDeep({
      items: albums.items,
      current: albums.items[albums.current.id]
    });
  }
}, albumsState);
