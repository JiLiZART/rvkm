import React, { Component } from 'react';

export default class Player extends Component {

  componentDidMount() {
    if (typeof Audio !== 'undefined') {
      this.audio = new Audio();
      this.bindAudio(this.audio);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { player } = this.props;
    const nextPlayer = nextProps.player;
    const current = player.get('current');
    const nextCurrent = nextPlayer.get('current');

    /**
     artist: "Amy Van Roekel"
     date: 1441476862
     duration: 170
     genre_id: 18
     id: 393341167
     lyrics_id: 274696727
     owner_id: 11109110
     title: "O Death(OST Until Dawn)"
     url: "https://cs9-4v4.vk.me/p7/24d404f0975760.mp3?extra=1LzkWtotdQKCOOBzMEHHsOV4etgij4-Ia2b5e1lX_ngU5VaI47u_hwBtz9TKQvBx0wYNBlOQtrVgq9BcWIiMLFPD4yVv02I"
     */
    let nextFileUrl = nextCurrent.getIn(['file', 'url']);
    let currentFileUrl = current.getIn(['file', 'url']);

    let nextMuted = nextCurrent.get('muted');
    let currentMuted = current.get('muted');

    let nextPlaying = nextCurrent.get('playing');
    let currentPlaying = current.get('playing');

    if (this.audio) {
      if (nextFileUrl !== currentFileUrl) {
        this.setAudioAndPlay(nextFileUrl);
      }

      if (nextMuted !== currentMuted) {
        this.mute(nextMuted);
      }

      if (nextPlaying !== currentPlaying) {
        nextPlaying ? this.play() : this.pause();
      }

    }
  }

  setAudioAndPlay(url) {
    this.pause();
    this.setSrc(url);
    this.play();
  }

  play() {
    if (this.audio) {
      this.audio.play();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  mute(status) {
    if (this.audio) {
      this.audio.muted = Boolean(status);
    }
  }

  setSrc(url) {
    if (url) {
      this.audio.src = url;
    }
  }

  unbindAudio(audio) {
    audio.removeEventListener('progress', this.handleProgress.bind(this));
    audio.removeEventListener('timeupdate', this.handleProgress.bind(this));
    audio.removeEventListener('ended', this.handleFileEnd.bind(this));
  }

  bindAudio(audio) {
    audio.addEventListener('progress', this.handleProgress.bind(this));
    audio.addEventListener('timeupdate', this.handleProgress.bind(this));
    audio.addEventListener('ended', this.handleFileEnd.bind(this));
  }

  destroyAudio() {
    if (this.audio) {
      this.unbindAudio(this.audio);
      delete this.audio;
    }
  }

  handleProgress(e) {
    if (this.audio) {
      this.props.onProgress({
        currentTime: this.audio.currentTime
      });
    }
  }

  handlePauseClick() {
    this.props.onPauseClick();
  }

  handlePlayClick() {
    this.props.onPlayClick();
  }

  handleMuteClick() {
    this.props.onMuteClick();
  }

  handlePrevClick() {
    this.props.onPrevClick();
  }

  handleNextClick() {
    this.props.onNextClick();
  }

  handleFileEnd() {
    this.props.onEnd();
  }

  render() {
    const player = this.props.player.toJS();
    const { current: { file: { url }, playing, muted } } = player;

    let mutedIcon = (<i className="music__player-icon glyphicon glyphicon-volume-up"></i>);

    if (muted) {
      mutedIcon = (<i className="music__player-icon glyphicon glyphicon-volume-off"></i>);
    }

    let playBtn = (
      <div className="music__player-btn music__player-btn_name_play"
           onClick={this.handlePauseClick.bind(this)}>
        <i className="music__player-icon glyphicon glyphicon-play"></i>
      </div>
    );

    if (playing) {
      playBtn = (
        <div className="music__player-btn music__player-btn_name_pause"
             onClick={this.handlePlayClick.bind(this)}>
          <i className="music__player-icon glyphicon glyphicon-pause"></i>
        </div>
      );
    }

    if (url) {
      return (
        <div class="music__player">
          <div className="music__player-btn music__player-btn_name_prev"
               onClick={this.handlePrevClick.bind(this)}>
            <i className="music__player-icon glyphicon glyphicon-backward"></i>
          </div>
          {playBtn}
          <div className="music__player-btn music__player-btn_name_next"
               onClick={this.handleNextClick.bind(this)}>
            <i className="music__player-icon glyphicon glyphicon-forward"></i>
          </div>
          <div className="music__player-btn music__player-btn_name_mute"
               onClick={this.handleMuteClick.bind(this)}>
            {mutedIcon}
          </div>
        </div>
      );
    }

    return null;
  }
}
