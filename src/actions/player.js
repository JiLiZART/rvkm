import { createAction } from 'redux-actions';

export const load = createAction('PLAYER_LOAD', file => file);
export const seek = createAction('PLAYER_SEEK', pos => pos);
export const seekEnd = createAction('PLAYER_SEEK_END');
export const play = createAction('PLAYER_PLAY');
export const pause = createAction('PLAYER_PAUSE');
export const next = createAction('PLAYER_NEXT');
export const prev = createAction('PLAYER_PREV');
export const progress = createAction('PLAYER_PROGRESS', value => value);
export const volume = createAction('PLAYER_VOLUME', value => value);
export const end = createAction('PLAYER_END');
