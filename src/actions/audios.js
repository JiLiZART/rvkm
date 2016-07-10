import {createAction} from 'redux-actions';
import Audio from 'models/Audio';
import {hide as menuHide} from './menu';

export const start = createAction('AUDIOS_FETCHING');
export const error = createAction('AUDIOS_ERROR', (err) => err);
export const load = createAction('AUDIOS', (item) => item);

export function fetchAll(albumID) {
  return (dispatch) => {
  };
}

export function fetchRecomended(userID) {
  return (dispatch) => {
    dispatch(start());
    return Audio.getRecommendations(userID, 0, 1000).then((r) => {
      const response = {
        id: 'recomended',
        title: 'Recomended',
        items: r.items,
        count: r.count
      };

      dispatch(load(response));
      dispatch(menuHide());

    }, (err) => dispatch(error(err)));
  };
}

export function fetchWall(albumID) {
  return (dispatch) => {
  };
}

export function fetchPopular(userID) {
  return (dispatch) => {
    dispatch(start());
    return Audio.getPopular(userID, 0, 1000).then((items) => {
      const response = {
        id: 'popular',
        title: 'Popular',
        items,
        count: items.length
      };

      dispatch(load(response));
      dispatch(menuHide());

    }, (err) => dispatch(error(err)));
  };
}

export function fetchAlbum(userID, albumID, albumTitle) {
  return (dispatch) => {
    dispatch(start());
    return Audio.get(userID, albumID, 0, 1000).then((r) => {
      const response = {
        id: albumID,
        title: albumTitle,
        items: r.items,
        count: r.count
      };

      dispatch(load(response));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)))
  };
}

export function fetchGroup(groupID, groupTitle) {
  return (dispatch) => {
    dispatch(start());
    return Audio.get(groupID, null, 0, 1000).then((r) => {
      const response = {
        id: groupID,
        title: groupTitle,
        items: r.items,
        count: r.count
      };

      dispatch(load(response));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)))
  };
}

export function fetchFriend(userID, userTitle) {
  return (dispatch) => {
    dispatch(start());
    return Audio.get(userID, null, 0, 1000).then((r) => {
      const response = {
        id: userID,
        title: userTitle,
        items: r.items,
        count: r.count
      };

      dispatch(load(response));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)))
  };
}
