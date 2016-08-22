export default class Album {
  constructor(data) {
    if (!data) throw Error('Empty data given to Album model');

    Object.assign(this, data);
  }

  getId() {
    return this.id
  }

  getName() {
    return this.title;
  }

  getOwnerId() {
    return this.owner_id;
  }

  static hydrate(fields) {
    return new Album(fields);
  }

  static hydrateArray(items) {
    return items.map(Album.hydrate);
  }
}
