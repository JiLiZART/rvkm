import { createAction } from 'redux-actions';

export const load = createAction('PLAYER_LOAD', file => file);
export const seekStart = createAction('PLAYER_SEEK', pos => pos);
export const seekEnd = createAction('PLAYER_SEEK_END');
export const play = createAction('PLAYER_PLAY');
export const pause = createAction('PLAYER_PAUSE');
export const next = createAction('PLAYER_NEXT', (player, playlist) => ({player, playlist}));
export const prev = createAction('PLAYER_PREV', (player, playlist) => ({player, playlist}));
export const progress = createAction('PLAYER_PROGRESS', value => value);
export const volume = createAction('PLAYER_VOLUME', value => value);
export const end = createAction('PLAYER_END');
