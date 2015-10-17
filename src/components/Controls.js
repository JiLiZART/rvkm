import React, { Component } from 'react';
import { Slider } from 'material-ui';
import PlayIcon from 'material-ui/lib/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/lib/svg-icons/av/pause';
import VolumeMuteIcon from 'material-ui/lib/svg-icons/av/volume-mute';
import VolumeOffIcon from 'material-ui/lib/svg-icons/av/volume-off';
import IconButton from 'material-ui/lib/icon-button';
import moment from 'moment';
import momentDuration from 'moment-duration-format';

export default class Controls extends Component {

  componentDidMount() {
    const { audioContext } = this.props;

    this.setAudio(audioContext);
  }

  componentWillUnmount() {
    delete this.audio;
  }

  componentWillReceiveProps(nextProps) {
    const nextPlayer = nextProps.player;
    const nextFileUrl = nextPlayer.getIn(['file', 'url'], '');
    const nextVolume = nextPlayer.get('volume');
    const nextPlaying = nextPlayer.get('playing');
    const nextPosition = nextPlayer.get('position', 0);

    const currentPlayer = this.props.player;
    const currentFileUrl = currentPlayer.getIn(['file', 'url'], '');
    const currentVolume = currentPlayer.get('volume');
    const currentPlaying = currentPlayer.get('playing');

    if (nextFileUrl !== currentFileUrl) {
      this.setSrcAndPlay(nextFileUrl);
    }

    if (nextVolume !== currentVolume) {
      this.volume(nextVolume);
    }

    if (nextPlaying !== currentPlaying) {
      nextPlaying ? this.play() : this.pause();
    }

    if (nextPosition > 0) {
      const startRange = this.audio.seekable.start(0);
      const endRange = this.audio.seekable.end(0);

      if (nextPosition > startRange && nextPosition < endRange) {
        this.audio.currentTime = nextPosition;
        this.props.onSeekEnd();
      }
    }
  }

  setSrc(url) {
    this.audio.src = url;
  }

  setAudio(audio) {
    this.audio = audio;

    return this;
  }

  setSrcAndPlay(url) {
    this.pause();
    this.setSrc(url);
    this.play();
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  volume(value) {
    this.audio.volume = Number(value);
  }

  handlePauseClick() {
    this.props.onPause();
  }

  handlePlayClick() {
    this.props.onPlay();
  }

  handleMuteClick() {
    this.props.onVolume(0);
  }

  handlePrevClick() {
    this.props.onPrev();
  }

  handleNextClick() {
    this.props.onNext();
  }

  handleVolumeChange(e, value) {
    this.props.onVolume(value);
  }

  static formatTime(value) {
    return moment.duration(value, 'seconds').format('mm:ss') || '';
  }

  render() {
    const { player } = this.props;
    const { playing, volume, time, file } = player.toJS();

    let mutedIcon;
    let playBtn;

    if (volume) {
      mutedIcon = (<i className="player__icon glyphicon glyphicon-volume-off"></i>);
    } else {
      mutedIcon = (<i className="player__icon glyphicon glyphicon-volume-up"></i>);
    }

    if (playing) {
      playBtn = (<IconButton onClick={this.handlePauseClick.bind(this)}><PauseIcon /></IconButton>);
    } else {
      playBtn = (<IconButton onClick={this.handlePlayClick.bind(this)}><PlayIcon /></IconButton>);
    }

    if (file && file.url) {
      return (
        <div className="player__controls">
          <div className="player__current-time">{Controls.formatTime(time)}</div>
          <div className="player__play-controls">
            <i className="player__icon player__icon_name_prev fa fa-backward" onClick={this.handlePrevClick.bind(this)}></i>
            {playBtn}
            <i className="player__icon player__icon_name_next fa fa-forward" onClick={this.handleNextClick.bind(this)}></i>
          </div>
          <div className="player__volume-level">
            <Slider name="volume" onChange={this.handleVolumeChange.bind(this)} defaultValue={this.audio.volume} />
          </div>
          <div className="player__btn player__btn_name_mute" onClick={this.handleMuteClick.bind(this)}>
            {mutedIcon}
          </div>
        </div>
      );
    } else {
      return (
        <div className="player__controls"></div>
      );
    }
  }

}
