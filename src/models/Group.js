export default class Group {
  constructor(data) {
    if (!data) throw Error('Empty data given to Group model');

    Object.assign(this, data);
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name;
  }

  getAvatar() {
    return this.photo_50;
  }

  static hydrate(fields) {
    return new Group(fields);
  }

  static hydrateArray(items) {
    return items.map(Group.hydrate);
  }
}
