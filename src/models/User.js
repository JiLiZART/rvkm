import Api from './Api.js';

/**
 id
 integer  идентификатор пользователя.
 first_name
 string  имя пользователя.
 last_name
 string  фамилия пользователя.
 deactivated
 string  поле возвращается, если страница пользователя удалена или заблокирована, содержит значение deleted или banned. В этом случае дополнительные поля fields не возвращаются.
 hidden
 integer  возвращается 1 при вызове без access_token, если пользователь установил настройку «Кому в интернете видна моя страница» — «Только пользователям ВКонтакте». В этом случае дополнительные поля fields не возвращаются.
 */
export default class User {
  constructor(data) {
    if (!data) throw Error('Empty data given to User model');

    Object.assign(this, data);
  }

  getId() {
    return Number.parseInt(this.id, 10);
  }

  getName() {
    return this.first_name;
  }

  getFullName() {
    const {first_name, last_name} = this;

    return `${first_name} ${last_name}`;
  }

  getAvatar() {
    return this.photo_50;
  }

  inProgress() {
    return this.fetching
  }

  isLoggedIn() {
    return this.id !== false
  }

  haveError() {
    return !!this.error
  }

  static hydrate(fields) {
    return new User(fields);
  }

  static hydrateArray(items) {
    return items.map(User.hydrate);
  }

  static login() {
    return Api.login(Api.ACCESS.AUDIO + Api.ACCESS.GROUPS + Api.ACCESS.FRIENDS);
  }

  static logout() {
    return Api.logout();
  }

  static status() {
    return Api.getLoginStatus();
  }

  static getByIDs(IDs) {
    return Api.call('users.get', {user_ids: IDs, fields: 'photo_50'});
  }
}
