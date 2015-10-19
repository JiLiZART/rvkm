class AudioContext {
  static create() {
    return new this();
  }

  constructor() {
    this.audio = new Audio();
  }

  on(event, callback) {
    this.audio.addEventListener(event, callback);

    return this;
  }

  off(event, callback) {
    this.audio.removeEventListener(event, callback);

    return this;
  }

  setCurrentTime(time) {
    this.audio.currentTime = time;

    return this;
  }

  setSrc(url) {
    this.audio.src = url;

    return this;
  }

  setSrcAndPlay(url) {
    this.pause();
    this.setSrc(url);
    this.play();

    return this;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  setVolume(value) {
    this.audio.volume = Number(value);

    return this;
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

  getBuffered() {
    return this.audio.buffered;
  }

  getSeekable() {
    return this.audio.seekable;
  }

}

export default AudioContext;
