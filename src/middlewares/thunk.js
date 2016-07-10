import { isFSA } from 'flux-standard-action';

const isFunction = (func) => typeof func === 'function';

export default function thunkMiddleware({ dispatch, getState }) {
  return (next) => {
    return (action) => {
      if (isFSA(action)) {
        return isFunction(action.payload) ? action.payload(dispatch, getState) : next(action);
      }

      return isFunction(action) ? action(dispatch, getState) : next(action);
    };
  };
}
