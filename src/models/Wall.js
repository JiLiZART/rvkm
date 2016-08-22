import Api from './Api';

export default class Wall {
  static get(userID, offset = 0, count = 10) {
    return Api.call('wall.get', {owner_id: userID, offset, count});
  }
}