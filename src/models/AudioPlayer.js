import Promise from 'bluebird';
import Audio from 'models/Audio';

class AudioPlayer {

  HAVE_NOTHING = 0;
  HAVE_METADATA = 1;
  HAVE_CURRENT_DATA = 2;
  HAVE_FUTURE_DATA = 3;
  HAVE_ENOUGH_DATA = 4;

  constructor() {
    this.audio = new window.Audio();
  }

  on(event, handler) {
    this.audio.addEventListener(event, handler);
  }

  off(event, handler) {
    this.audio.removeEventListener(event, handler);
  }

  loadFromUrl(url) {
    this.audio.src = url;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  position(value) {
    if (value > 0) {
      const startRange = this.getSeekable().start(0);
      const endRange = this.getSeekable().end(0);

      if (value > startRange && value < endRange) {
        this.setCurrentTime(value);
        return true;
      }
    }

    return false;
  }

  volume(value) {
    this.audio.volume = Number(value / 100);

    return this;
  }

  getBlob() {
    return new Promise((fulfill, reject) => {
      var request = new XMLHttpRequest();
      request.open('GET', this.audio.src, true);
      request.responseType = 'blob';
      request.onload = () => fulfill(request.response);
      request.onerror = () => reject(request.responseText);
      request.send();
    });
  }

  getVolume() {
    return this.audio.volume;
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getState() {
    return this.audio.readyState;
  }

  getDuration() {
    return this.audio.duration;
  }

  /**
   * @returns {TimeRanges}
   */
  getBuffered() {
    return this.audio.buffered;
  }

  getSeekable() {
    return this.audio.seekable;
  }

  getInfo() {
    if (this.getState() === this.HAVE_ENOUGH_DATA) {
      const duration = this.getDuration();
      const startRange = this.getBuffered().start(0);
      const endRange = this.getBuffered().end(0);
      const buffered = endRange - startRange;
      const time = duration - Math.round(this.getCurrentTime());

      return {
        time: Audio.formatDuration(Math.round(time)),
        progress: time ? ((duration - time) / duration) * 100 : 0,
        buffer: buffered / duration * 100
      }
    }

    return {}
  }
}

export default new AudioPlayer();
