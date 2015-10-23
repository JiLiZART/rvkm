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

  src(url) {
    this.audio.src = url;

    return this;
  }

  srcAndPlay(url) {
    if (this.audio.src !== url) {
      this.pause();
      this.src(url);
      this.play();
    }

    return this;
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
