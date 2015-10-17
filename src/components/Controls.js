import React, { Component } from 'react';
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

    if (this.audio) {

      console.log('current, next', currentFileUrl, nextFileUrl);

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
    if (value === 0) {
      this.audio.muted = Boolean(value);
    }
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
      playBtn = (
        <i className="player__icon player__icon_name_pause fa fa-pause"
           onClick={this.handlePlayClick.bind(this)}></i>
      );
    } else {
      playBtn = (
        <i className="player__icon player__icon_name_play fa fa-play"
           onClick={this.handlePauseClick.bind(this)}></i>
      )
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
          <div className="player__volume-level"></div>
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
