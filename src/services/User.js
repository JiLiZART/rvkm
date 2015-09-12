import Api from './Api.js';

export default class User {
  static login() {
    return Api.login(VK.access.AUDIO)
  }

  static logout() {
    return Api.logout()
  }

  static sessionCheck() {
    return Api.getLoginStatus();
  }

  static getAlbums(userID) {
    return Api.call('audio.getAlbums', {owner_id: userID});
  }

  static getPlaylist(userID) {
    return Api.call('audio.get', {owner_id: userID})
  }
}
