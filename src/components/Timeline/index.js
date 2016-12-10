import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import AudioPlayer from 'models/AudioPlayer';

import {connect} from 'react-redux';
import {seek} from 'actions/player';

const mapStateToProps = (state) => {
  return {
    player: state.player.toJS()
  };
};

const timeline = block('timeline');

class Timeline extends Component {
  state = {
    seek: 0,
    buffer: 0,
    progress: 0
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateTrail);

    AudioPlayer.on('progress', () => this.setState(AudioPlayer.getInfo()));
    AudioPlayer.on('timeupdate', () => this.setState(AudioPlayer.getInfo()));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTrail);
  }

  updateTrail = () => this.setState({width: this._trail.clientWidth});

  calculateSeek(e) {
    return (e.clientX / this.state.width) * 100;
  }

  handleTrailEnter = () => this.updateTrail();
  handleTrailMove = (e) => this.setState({seek: this.calculateSeek(e)});
  handleTrailLeave = () => this.setState({seek: 0});
  handleTrailClick = (e) => {
    const seek = this.props.seek;
    const duration = this.props.player.audio.duration;
    const percent = this.calculateSeek(e);
    const value = (duration * percent) / 100;

    seek(value);
  };

  render() {
    const {seek, buffer, progress} = this.state;

    return (
      <div className={timeline({seek: Boolean(seek)})}
           onMouseEnter={this.handleTrailEnter}
           onMouseMove={this.handleTrailMove}
           onMouseLeave={this.handleTrailLeave}
           onClick={this.handleTrailClick}
           ref={(el) => this._trail = el}>
        <div className={timeline('trail')}>
          <div className={timeline('buffer')} style={{width: buffer + '%'}}></div>
          <div className={timeline('seek')} style={{width: seek + '%'}}></div>
          <div className={timeline('progress')} style={{width: progress + '%'}}></div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {seek}
)(Timeline);
