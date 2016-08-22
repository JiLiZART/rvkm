import Api from './Api.js';

export default class Friends {
  static getById(userID, offset = 0, count = 10) {
    return Api.call('friends.get', {owner_id: userID, fields: 'photo_50', order: 'hints', offset, count});
  }
}
