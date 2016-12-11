import Api from './Api';
import Wall from './Wall';
import AudioPlayer from './AudioPlayer';

const isAttachmentAudio = (attachment) => {
  return attachment.type === 'audio';
};

const fromAttachments = (attachments) => {
  return (attachments || []).filter(isAttachmentAudio).map((file) => file.audio);
};

const mapPost = (post) => {
  var audios = [];

  if (Array.isArray(post.attachments) && post.attachments.length) {
    audios = audios.concat(fromAttachments(post.attachments));
  }

  if (Array.isArray(post.copy_history) && post.copy_history.length &&
    Array.isArray(post.copy_history[0].attachments) && post.copy_history[0].attachments.length
  ) {
    audios = audios.concat(fromAttachments(post.copy_history[0].attachments));
  }

  return audios;
};


/**
 id  идентификатор аудиозаписи.
 положительное число
 owner_id  идентификатор владельца аудиозаписи.
 int (числовое значение)
 artist  исполнитель.
 строка
 title  название композиции.
 строка
 duration  длительность аудиозаписи в секундах.
 положительное число
 url  ссылка на mp3.
 строка
 lyrics_id  идентификатор текста аудиозаписи (если доступно).
 положительное число
 album_id  идентификатор альбома, в котором находится аудиозапись (если присвоен).
 положительное число
 genre_id  идентификатор жанра из списка аудио жанров.
 положительное число
 date  дата добавления.
 положительное число
 no_search  1, если включена опция «Не выводить при поиске». Если опция отключена, поле не возвращается.
 положительное число
 */
export default class Audio {
  constructor(data) {
    if (!data) throw Error('Empty data given to Audio model');

    Object.assign(this, data);
  }

  getId() {
    return this.id;
  }

  getAlbumId() {
    return this.album_id;
  }

  getArtist() {
    return this.artist;
  }

  getSong() {
    return this.title;
  }

  getDuration() {
    return this.duration;
  }

  getUrl() {
    return this.url;
  }

  getGenreName() {
    return Audio.GENRES[this.genre_id];
  }

  static GENRES = {
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

  static hydrate(fields) {
    return new Audio(fields);
  }

  static hydrateArray(items) {
    return items.map(Audio.hydrate);
  }

  static loadFromUrl(audio) {
    return new Promise((resolve, reject) => {
      Audio.getById(audio.id, audio.owner_id).then((items) => {
        if (Array.isArray(items) && items.length) {
          const item = items[0];

          AudioPlayer.loadFromUrl(item.url).then(() => {
            resolve(item);
          }, reject);
        }
      }, reject);
    });
  }

  static get(userID, albumID, offset = 0, count = 10) {
    const params = {owner_id: userID, offset, count};

    if (Number.isInteger(albumID)) {
      params.album_id = albumID;
    }

    return Api.call('audio.get', params);
  }

  static getById(audioID, userID) {
    return Api.call('audio.getById', {audios: `${userID}_${audioID}`})
  }

  static add(audioID, userID, albumID) {
    const params = {audio_id: audioID, owner_id: userID};

    if (Number.isInteger(albumID)) {
      params.album_id = albumID;
    }

    return Api.call('audio.add', params);
  }

  static remove(audioID, userID) {
    return Api.call('audio.delete', {audio_id: audioID, owner_id: userID});
  }

  static getWall(userID) {
    return Wall.get(userID).then((r) => {
      return r.items.map(mapPost).reduce((prev, next) => prev.concat(next), [])
    })
  }

  static getAll(userID, offset = 0, count = 100) {
    return Api.call('audio.get', {owner_id: userID, offset, count});
  }

  static getPopular(userID, offset = 0, count = 100) {
    return Api.call('audio.getPopular', {owner_id: userID, offset, count})
  }

  static getRecommendations(userID, offset = 0, count = 100) {
    return Api.call('audio.getRecommendations', {user_id: userID, offset, count})
  }

  static getAlbums(userID, offset = 0, count = 10) {
    if (count > 100) throw Error('getAlbums count cannot be greater than 100');

    return Api.call('audio.getAlbums', {owner_id: userID, offset, count});
  }
}
