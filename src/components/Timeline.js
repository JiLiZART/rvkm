import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import 'moment-duration-format';

import styles from 'styles/blocks/timeline.styl';

@connect((state) => {
  return {
    player: state.player
  };
}) class Timeline extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      seek: 0,
      buffer: 0,
      progress: 0,
      time: '',
      trailWidth: 0
    };
  }

  componentDidMount() {
    const { audioContext } = this.props;
    const timeline = React.findDOMNode(this.refs.timeline);

    const updateTrail = () => {
      this.setState({
        width: timeline.clientWidth
      });
    };

    updateTrail();

    window.addEventListener('resize', updateTrail);

    this
      .setAudio(audioContext)
      .bindEvents();
  }

  componentWillUnmount() {
    this.unbindEvents();

    delete this.audioContext;
  }

  renderInfo() {
    const { player } = this.props;
    const { width, time } = this.state;
    const { duration } = player.toJS();
    const durationMinutes = Timeline.formatTime(duration);
    const timeMinutes = Timeline.formatTime(time);

    return (
      <div className={styles.timeline__info} style={{width: width + 'px'}}>
        <div className={styles.timeline__time}>{timeMinutes}</div>
        <div className={styles.timeline__length}>{durationMinutes}</div>
      </div>
    );
  }

  render() {
    const { seek, buffer, progress } = this.state;
    const { player } = this.props;
    const { file } = player.toJS();
    const haveFile = Boolean(file && file.url);
    const info = this.renderInfo();
    const inSeek = Boolean(seek) ? styles.timeline_seek : '';

    if (haveFile) {
      return (
        <div className={styles.timeline + ' ' + inSeek} ref="timeline"
             onMouseMove={this.handleTrailMove.bind(this)}
             onMouseLeave={this.handleTrailLeave.bind(this)}
             onClick={this.handleTrailClick.bind(this)}
          >
          <div className={styles.timeline__trail} ref="trail">
            <div className={styles.timeline__buffer} style={{width: buffer + '%'}}></div>
            <div className={styles.timeline__seek} ref="seek" style={{width: seek + '%'}}></div>
            {info}
            <div className={styles.timeline__progress} style={{width: progress + '%'}}>{info}</div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.timeline} ref="timeline"></div>
    );
  }

  unbindEvents() {
    const audio = this.audioContext;

    audio
      .off('progress', this.handleProgress.bind(this))
      .off('timeupdate', this.handleProgress.bind(this))
      .off('ended', this.handleFileEnd.bind(this));

    return this;
  }

  bindEvents() {
    const audio = this.audioContext;

    audio
      .on('progress', this.handleProgress.bind(this))
      .on('timeupdate', this.handleProgress.bind(this))
      .on('ended', this.handleFileEnd.bind(this));

    return this;
  }

  setAudio(audio) {
    this.audioContext = audio;

    return this;
  }

  handleProgress() {
    if (this.audioContext && this.audioContext.getState() === 4) {
      const duration = this.props.player.get('duration');
      const startRange = this.audioContext.getBuffered().start(0);
      const endRange = this.audioContext.getBuffered().end(0);
      const buffered = endRange - startRange;
      const time = duration - Math.round(this.audioContext.getCurrentTime());
      const progress = time ? ((duration - time) / duration) * 100 : 0;
      const buffer = buffered / duration * 100;

      // this.props.onProgress({time, progress, buffer});
      this.setState({time, progress, buffer});
    }
  }

  handleFileEnd() {
    this.props.onEnd();
  }

  handleTrailMove(e) {
    this.setState({
      seek: Timeline.calculateSeek(e, this.state.width) * 100
    });
  }

  handleTrailLeave() {
    this.setState({
      seek: 0
    });
  }

  handleTrailClick(e) {
    const duration = this.props.player.get('duration');
    const currentPercent = Timeline.calculateSeek(e, this.state.width);
    const currentDuration = duration * currentPercent;

    this.props.onSeek(currentDuration);
  }

  static calculateSeek(e, width) {
    return e.clientX / width;
  }

  static formatTime(value) {
    return moment.duration(value, 'seconds').format('mm:ss') || '';
  }
}

export default Timeline;
