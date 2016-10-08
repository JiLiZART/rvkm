import {createAction} from 'redux-actions';
import Audio from 'models/Audio';
import {hide as menuHide} from './menu';

export const start = createAction('AUDIOS_FETCHING', (id) => id);
export const error = createAction('AUDIOS_ERROR', (err) => err);
export const load = createAction('AUDIOS', (item) => item);
export const addSuccess = createAction('AUDIOS_ADD', (item) => item);
export const removeSuccess = createAction('AUDIOS_REMOVE', (item) => item);

export function add(audioID, userID, albumID) {
  return (dispatch) => {
    return Audio.add(audioID, userID, albumID).then(() => dispatch(addSuccess()));
  };
}

export function remove(audioID, userID) {
  return (dispatch) => {
    return Audio.remove(audioID, userID).then(() => dispatch(removeSuccess()));
  };
}

export function fetchRecomended(userID, offset = 0, count = 100) {
  return (dispatch) => {
    dispatch(start('recomended'));
    return Audio.getRecommendations(userID, offset, count).then(({items, count}) => {
      dispatch(load({id: 'recomended', title: 'Recomended', items, count}));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)));
  };
}

export function fetchWall(userID, offset = 0, count = 100) {
  return (dispatch) => {
    dispatch(start('wall'));
    return Audio.getWall(userID, offset, count).then((items) => {
      dispatch(load({id: 'wall', title: 'Wall', items, count: items.length}));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)));
  };
}

export function fetchPopular(userID, offset = 0, count = 100) {
  return (dispatch) => {
    dispatch(start('popular'));
    return Audio.getPopular(userID, offset, count).then((items) => {
      dispatch(load({id: 'popular', title: 'Popular', items, count: items.length}));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)));
  };
}

export function fetchAll(userID, offset = 0, count = 100) {
  return (dispatch) => {
    dispatch(start('all'));
    return Audio.getAll(userID, offset, count).then(({items, count}) => {
      dispatch(load({id: 'all', title: 'All', items, count}));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)))
  };
}

export function fetchAlbum(userID, id, title, offset = 0, count = 100) {
  return (dispatch) => {
    dispatch(start(id));
    return Audio.get(userID, id, offset, count).then(({items, count}) => {
      dispatch(load({id, title, items, count}));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)))
  };
}

export function fetchGroup(id, title, offset = 0, count = 100) {
  return (dispatch) => {
    dispatch(start(id));
    return Audio.get(id, null, offset, count).then(({items, count}) => {
      dispatch(load({id, title, items, count}));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)))
  };
}

export function fetchFriend(id, title, offset = 0, count = 100) {
  return (dispatch) => {
    dispatch(start(id));
    return Audio.get(id, null, offset, count).then(({items, count}) => {
      dispatch(load({id, title, items, count}));
      dispatch(menuHide());
    }, (err) => dispatch(error(err)))
  };
}
