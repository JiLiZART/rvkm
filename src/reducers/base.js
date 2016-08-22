export const defaultState = {
  fetching: false,
  error: false,
  items: [],
  count: 0,
};

export const FETCHING = (state) => {
  return Object.assign({}, state, {fetching: true, error: false});
};

export const SUCCESS = (state, action) => {
  return Object.assign({}, action.payload, {fetching: false, error: false});
};

export const ERROR = (state) => {
  return Object.assign({}, state, {fetching: false, error: true});
};
