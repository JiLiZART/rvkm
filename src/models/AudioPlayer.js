import Promise from 'bluebird';
import Audio from 'models/Audio';

class AudioPlayer {

  HAVE_NOTHING = 0;
  HAVE_METADATA = 1;
  HAVE_CURRENT_DATA = 2;
  HAVE_FUTURE_DATA = 3;
  HAVE_ENOUGH_DATA = 4;

  constructor() {
    this.context = new AudioContext();
    this.audio = new window.Audio();
    //this.source = this.context.createMediaElementSource(this.audio);
    //this.analyser = this.createAnalyzer();
  }

  createAnalyzer() {
    this.analyser = this.context.createAnalyser();

    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 32;

    const bands = new Uint8Array(this.analyser.frequencyBinCount);
    const analyserNode = this.context.createScriptProcessor(256, 1, 1);

    this.analyser.connect(analyserNode);

    analyserNode.onaudioprocess = () => {
      this.analyser.getByteFrequencyData(bands);
    };

    // window.setInterval(() => {
    //   this.updateVisualization(bands);
    // }, 100);

    analyserNode.connect(this.context.destination);

    return analyserNode;
  }

  on(event, handler) {
    this.audio.addEventListener(event, handler);
    return this;
  }

  off(event, handler) {
    this.audio.removeEventListener(event, handler);
    return this;
  }

  loadFromUrl(url) {
    this.audio.src = url;

    return new Promise((resolve, reject) => {
      const handler = this.loadHandler(resolve);

      this
        .off('canplay', handler)
        .on('canplay', handler)
    });
  }

  loadHandler = (done) => () => done();

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  seek(value) {
    if (value > 0) {
      const startRange = this.getSeekable().start(0);
      const endRange = this.getSeekable().end(0);

      if (value > startRange && value < endRange) {
        this.audio.currentTime = value;
        return true;
      }
    }

    return false;
  }

  volume(value) {
    this.audio.volume = Number(value / 100);

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
        time: Math.round(time),
        progress: time ? ((duration - time) / duration) * 100 : 0,
        buffer: buffered / duration * 100
      };
    }

    return {};
  }
}

export default new AudioPlayer();
