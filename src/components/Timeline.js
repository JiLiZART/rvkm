import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import 'moment-duration-format';

@connect((state) => {
  return {
    player: state.player
  };
})
class Timeline extends Component {
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
    const trail = React.findDOMNode(this.refs.trail);
    const timeline = React.findDOMNode(this.refs.timeline);
    const updateTrail = () => {
      this.setState({
        trailWidth: timeline.clientWidth
      });
    };

    updateTrail();

    window.addEventListener('resize', updateTrail);

    this
      .setTrail(trail)
      .setAudio(audioContext)
      .bindEvents();
  }

  componentWillUnmount() {
    this.unbindEvents();

    delete this.trail;
    delete this.audio;
  }

  renderInfo() {
    const { player } = this.props;
    const { trailWidth, time } = this.state;
    const { duration } = player.toJS();
    const durationMinutes = Timeline.formatTime(duration);
    const timeMinutes = Timeline.formatTime(time);

    return (
      <div className="timeline__info" style={{width: trailWidth + 'px'}}>
        <div className="timeline__time">{timeMinutes}</div>
        <div className="timeline__length">{durationMinutes}</div>
      </div>
    );
  }

  render() {
    const { seek, buffer, progress } = this.state;
    const info = this.renderInfo();

    return (
      <div className="timeline" ref="timeline">
        <div className="timeline__trail" ref="trail">
          <div className="timeline__buffer" style={{width: buffer + '%'}}></div>
          <div className="timeline__seek" ref="seek" style={{width: seek + '%'}}></div>
          {info}
          <div className="timeline__progress" style={{width: progress + '%'}}>{info}</div>
        </div>
      </div>
    );
  }

  unbindEvents() {
    const audio = this.audio;
    const trail = this.trail;

    audio.removeEventListener('progress', this.handleProgress.bind(this));
    audio.removeEventListener('timeupdate', this.handleProgress.bind(this));
    audio.removeEventListener('ended', this.handleFileEnd.bind(this));

    trail.removeEventListener('mousemove', this.handleTrailMove.bind(this, trail));
    trail.removeEventListener('mouseleave', this.handleTrailLeave.bind(this, trail));
    trail.removeEventListener('click', this.handleTrailClick.bind(this, trail));

    return this;
  }

  bindEvents() {
    const audio = this.audio;
    const trail = this.trail;

    audio.addEventListener('progress', this.handleProgress.bind(this));
    audio.addEventListener('timeupdate', this.handleProgress.bind(this));
    audio.addEventListener('ended', this.handleFileEnd.bind(this));

    trail.addEventListener('mousemove', this.handleTrailMove.bind(this, trail));
    trail.addEventListener('mouseleave', this.handleTrailLeave.bind(this, trail));
    trail.addEventListener('click', this.handleTrailClick.bind(this, trail));

    return this;
  }

  setTrail(trail) {
    this.trail = trail;

    return this;
  }

  setAudio(audio) {
    this.audio = audio;

    return this;
  }

  handleProgress() {
    if (this.audio && this.audio.readyState === 4) {
      const startRange = this.audio.buffered.start(0);
      const endRange = this.audio.buffered.end(0);
      const duration = this.props.player.get('duration');
      const buffered = endRange - startRange;
      const time = duration - Math.round(this.audio.currentTime);
      const progress = time ? ((duration - time) / duration) * 100 : 0;
      const buffer = buffered / duration * 100;

      //this.props.onProgress({time, progress, buffer});
      this.setState({time, progress, buffer});
    }
  }

  handleFileEnd() {
    this.props.onEnd();
  }

  handleTrailMove(trailNode, e) {
    this.setState({
      seek: Timeline.calculateSeek(trailNode, e) * 100
    });
  }

  handleTrailLeave() {
    this.setState({
      seek: 0
    });
  }

  handleTrailClick(trailNode, e) {
    const duration = this.props.player.get('duration');
    const currentPercent = Timeline.calculateSeek(trailNode, e);
    const currentDuration = duration * currentPercent;

    this.props.onSeek(currentDuration);
  }

  static calculateSeek(trailNode, e) {
    const fullTrailWidth = trailNode.offsetLeft + trailNode.offsetWidth;
    const currentOffset = e.offsetX;

    return currentOffset / fullTrailWidth;
  }

  static formatTime(value) {
    return moment.duration(value, 'seconds').format('mm:ss') || '';
  }
}

export default Timeline;
