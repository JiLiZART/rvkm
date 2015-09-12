import Promise from 'bluebird';

const API_VERSION = '5.37';

class Api {
  static getLoginStatus(force) {
    return new Promise((fulfill, reject) => {
      VK.Auth.getLoginStatus((r) => {
        if (r.error) {
          reject(r.error);
        }
        if (r.session) {
          fulfill(r.session);
        }
      }, force);
    });
  }

  static login(settings) {
    return new Promise((fulfill, reject) => {
      VK.Auth.login((r) => {
        if (r.error) {
          reject(r.error);
        }
        if (r.session) {
          fulfill(r.session);
        }
      }, settings);
    });
  }

  static logout() {
    return new Promise((fulfill, reject) => {
      VK.Auth.logout((r) => {
        if (r.error) {
          reject(r.error);
        }
      });
    });
  }

  static call(method, params, queryTry) {
    return new Promise((fulfill, reject) => {
      VK.Api.call(method, Object.assign({
        v: API_VERSION
      }, params, queryTry), (r) => {
        if (r.error) {
          reject(r.error)
        }

        if (r.response) {
          fulfill(r.response);
        }
      });
    });
  }
}

class User {
  static login() {
    return Api.login(VK.access.AUDIO)
  }

  static logout() {
    return Api.logout()
  }

  static sessionCheck() {
    return Api.getLoginStatus();
  }

  static sessionStart(session) {
    return session;
  }

  static getAlbums(userID) {
    return Api.call('audio.getAlbums', {owner_id: userID});
  }

  static getPlaylist(userID) {
    return Api.call('audio.get', {owner_id: userID})
  }
}

class Player {
  static load(file) {
    return file;
  }

  static progress(e) {
    return e;
  }
}

export default {
  Api,
  User,
  Player
}
