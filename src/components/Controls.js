import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Slider } from 'material-ui';
import PlayIcon from 'material-ui/lib/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/lib/svg-icons/av/pause';
import VolumeMuteIcon from 'material-ui/lib/svg-icons/av/volume-mute';
import VolumeOffIcon from 'material-ui/lib/svg-icons/av/volume-off';
import ForwardIcon from 'material-ui/lib/svg-icons/av/fast-forward';
import RewindIcon from 'material-ui/lib/svg-icons/av/fast-rewind';
import IconButton from 'material-ui/lib/icon-button';

@connect((state) => {
  return {
    player: state.player
  };
})
class Controls extends Component {

  componentDidMount() {
    const { audioContext } = this.props;

    this.setAudio(audioContext);
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

  componentWillUnmount() {
    delete this.audio;
  }

  render() {
    const { player } = this.props;
    const { playing, volume, file } = player.toJS();
    const disableControls = !Boolean(file && file.url);
    const defaultVolume = this.audio ? this.audio.volume : 1;

    let mutedIcon;
    let playBtn;

    if (volume) {
      mutedIcon = (<VolumeOffIcon />);
    } else {
      mutedIcon = (<VolumeMuteIcon />);
    }

    if (playing) {
      playBtn = (
        <IconButton disabled={disableControls} onClick={this.handlePauseClick.bind(this)}>
          <PauseIcon style={{width: '40px', height: '40px'}}/>
        </IconButton>
      );
    } else {
      playBtn = (
        <IconButton disabled={disableControls} onClick={this.handlePlayClick.bind(this)}>
          <PlayIcon style={{width: '40px', height: '40px'}}/>
        </IconButton>
      );
    }

    return (
      <div className="player__controls">
        <div className="player__play-controls">
          <IconButton disabled={disableControls} onClick={this.handlePrevClick.bind(this)}><RewindIcon /></IconButton>
          {playBtn}
          <IconButton disabled={disableControls} onClick={this.handleNextClick.bind(this)}><ForwardIcon /></IconButton>
        </div>
        <div className="player__volume-level">
          <IconButton disabled={disableControls} onClick={this.handleMuteClick.bind(this)}>{mutedIcon}</IconButton>
          <Slider name="volume" className="player__volume-slider" disabled={disableControls} onChange={this.handleVolumeChange.bind(this)} defaultValue={defaultVolume} step={0.01}/>
        </div>
      </div>
    );
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
    this.volume(value);
  }
}

export default Controls;
