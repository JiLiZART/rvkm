import Promise from 'bluebird';

class Api {
  static VERSION = '5.37';

  static ACCESS = {
    GROUPS: 262144,
    AUDIO: 8,
    FRIENDS: 2
  };

  static ERROR = {
    UNKNOWN: 1,
    TOO_MANY_REQUESTS: 6,
    ACCESS_DENIED: 15,
    NEED_CAPTCHA: 14
  };

  static getLoginStatus(force) {
    return new Promise((fulfill, reject) => {
      VK.Auth.getLoginStatus((r) => {
        console.log('auth.loginStatus', r);
        if (r.error) reject(r.error);
        fulfill(r.session);
      }, force);
    });
  }

  static login(settings) {
    return new Promise((fulfill, reject) => {
      VK.Auth.login((r) => {
        console.log('auth.login', r);
        if (r.error) reject(r.error);
        fulfill(r.session);
      }, settings);
    });
  }

  static logout() {
    return new Promise((fulfill, reject) => {
      VK.Auth.logout((r) => {
        if (r.error) reject(r.error);
        fulfill();
      });
    });
  }

  static call(method, params, queryTry) {
    return new Promise((fulfill, reject) => {
      VK.Api.call(method, Object.assign({v: Api.VERSION}, params, queryTry), (r) => {
        console.log(method, params, r);
        if (r.error) reject(r.error);
        fulfill(r.response);
      });
    });
  }

  static appendScript() {
    const el = document.createElement('script');
    const transport = document.getElementById('vk-api-transport');

    el.type = 'text/javascript';
    el.src = '//vk.com/js/api/openapi.js';
    el.async = true;

    transport.appendChild(el);
  }
}

export default Api;
