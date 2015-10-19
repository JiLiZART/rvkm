import Promise from 'bluebird';

const API_VERSION = '5.37';

export default class Api {
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
        } else {
          fulfill();
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
          reject(r.error);
        }

        if (r.response) {
          fulfill(r.response);
        }
      });
    });
  }
}
