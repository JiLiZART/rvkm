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
    return new Promise((resolve, reject) => {
      VK.Auth.getLoginStatus((r) => {
        const {session, error} = r;
        console.log('auth.loginStatus', r);
        if (error) reject(error);
        resolve(session);
      }, force);
    });
  }

  static login(settings) {
    return new Promise((resolve, reject) => {
      VK.Auth.login((r) => {
        const {session, error} = r;
        console.log('auth.login', r);
        if (error) reject(error);
        resolve(session);
      }, settings);
    });
  }

  static logout() {
    return new Promise((resolve, reject) => {
      VK.Auth.logout((r) => {
        const {error} = r;
        if (error) reject(error);
        resolve();
      });
    });
  }

  static call(method, params, queryTry) {
    return new Promise((resolve, reject) => {
      VK.Api.call(method, Object.assign({v: Api.VERSION}, params, queryTry), (r) => {
        const {response, error} = r;
        console.log(method, params, r);
        if (error) reject(error);
        resolve(response);
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
