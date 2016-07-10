import Api from './Api';

export default class Groups {
  static getById(userID, offset = 0, count = 10) {
    return Api.call('groups.get', {user_id: userID, fields: 'photo_50', extended: true, offset, count});
  }
}
