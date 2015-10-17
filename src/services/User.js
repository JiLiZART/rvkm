import Api from './Api.js';
import Promise from 'bluebird';

export const GENRES = {
  1: 'Rock',
  2: 'Pop',
  3: 'Rap & Hip-Hop',
  4: 'Easy Listening',
  5: 'Dance & House',
  6: 'Instrumental',
  7: 'Metal',
  21: 'Alternative',
  8: 'Dubstep',
  9: 'Jazz & Blues',
  10: 'Drum & Bass',
  11: 'Trance',
  12: 'Chanson',
  13: 'Ethnic',
  14: 'Acoustic & Vocal',
  15: 'Reggae',
  16: 'Classical',
  17: 'Indie Pop',
  19: 'Speech',
  22: 'Electropop & Disco',
  18: 'Other'
};

export const ALBUM = {
  ALL: 0,
  RECOMMENDED: 1,
  WALL: 2,
  POPULAR: 3
};

export default class User {
  static login() {
    return Api.login(VK.access.AUDIO)
  }

  static logout() {
    return Api.logout()
  }

  static status() {
    return Api.getLoginStatus();
  }

  static getFriends(userID) {
    return new Promise((fulfill, reject) => {
      Api.call('friends.get', {owner_id: userID, fields: 'photo_50', order: 'hints'}).then((friendsResponse) => {
        const friends = {};

        if (friendsResponse.items && friendsResponse.count) {
          friendsResponse.items.forEach((item) => {
            friends[item.id] = {
              id: item.id,
              title: item.first_name + ' ' + item.last_name,
              items: [],
              count: 0,
              avatar: item.photo_50
            }
          });

          fulfill(friends);
        }
      }, reject);
    });
  }

  static getGroups(userID) {
    return new Promise((fulfill, reject) => {
      Api.call('groups.get', {owner_id: userID, extended: true}).then((groupsResponse) => {
        const groups = {};

        if (groupsResponse.items && groupsResponse.count) {
          groupsResponse.items.forEach((item) => {
            groups[item.id] = {
              id: item.id,
              title: item.name,
              items: [],
              count: 0,
              avatar: item.photo_50
            }
          });

          fulfill(groups);
        }
      }, reject);
    });
  }

  static getAlbums(userID) {
    return new Promise((fulfill, reject) => {
      Api.call('audio.get', {owner_id: userID}).then((audioResponse) => {
        if (audioResponse.items && audioResponse.count) {
          const files = audioResponse.items;
          const albumsFiles = files.filter((audio) => audio.album_id);

          Api.call('audio.getAlbums', {owner_id: userID}).then((albumsResponse) => {
            if (albumsResponse.items && albumsResponse.count) {
              const albums = {};

              albums[ALBUM.ALL] = {
                id: ALBUM.ALL,
                title: 'All',
                items: files,
                count: files.length
              };

              albumsResponse.items.forEach((item, idx) => {
                let albumFiles = albumsFiles.filter((audio) => audio.album_id === item.id);

                albums[item.id] = {
                  id: item.id,
                  title: item.title,
                  items: albumFiles,
                  count: albumFiles.length
                }
              });

              fulfill(albums);
            } else reject();
          }, reject);
        } else reject();
      }, reject)
    });
  }

  static getPlaylist(userID) {
    return Api.call('audio.get', {owner_id: userID})
  }
}
