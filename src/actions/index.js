import { createAction } from 'redux-actions';

const actions = {
  session: require('./session'),
  player: require('./player'),
  albums: require('./albums'),
  groups: require('./groups'),
  friends: require('./friends'),
  playlist: require('./playlist'),
  app: require('./app')
};

export default actions;
