import { createAction } from 'redux-actions';

export const start = createAction('PLAYLIST_START');
export const error = createAction('PLAYLIST_ERROR');
export const load = createAction('PLAYLIST_SUCCESS', item => item);
