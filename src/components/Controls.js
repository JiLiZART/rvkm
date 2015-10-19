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

import styles from 'styles/blocks/controls.styl';

@connect((state) => {
  return {
    player: state.player
  };
}) class Controls extends Component {

  componentDidMount() {
    const { audioContext } = this.props;

    this.setAudioContext(audioContext);
  }

  componentWillReceiveProps(nextProps) {
    const nextPlayer = nextProps.player;
    const nextFileUrl = nextPlayer.getIn(['file', 'url'], '');
    const nextPosition = nextPlayer.get('position', 0);

    this.audioContext.srcAndPlay(nextFileUrl);

    if (this.audioContext.position(nextPosition)) {
      this.props.onSeekEnd();
    }
  }

  componentWillUnmount() {
    delete this.audio;
  }

  render() {
    const { player } = this.props;
    const { playing, volume, file } = player.toJS();
    const disableControls = !Boolean(file && file.url);
    const defaultVolume = this.audioContext ? this.audioContext.getVolume() : 1;

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
      <div className={styles.controls}>
        <div className={styles.controls__buttons}>
          <IconButton disabled={disableControls} onClick={this.handlePrevClick.bind(this)}><RewindIcon /></IconButton>
          {playBtn}
          <IconButton disabled={disableControls} onClick={this.handleNextClick.bind(this)}><ForwardIcon /></IconButton>
        </div>
        <div className={styles.controls__volume}>
          <IconButton controls={disableControls} onClick={this.handleMuteClick.bind(this)}>{mutedIcon}</IconButton>
          <Slider name="volume" className={styles.controls__slider} disabled={disableControls} onChange={this.handleVolumeChange.bind(this)} defaultValue={defaultVolume} step={0.01}/>
        </div>
      </div>
    );
  }

  setAudioContext(audio) {
    this.audioContext = audio;

    return this;
  }

  handlePauseClick() {
    this.audioContext.pause();
    this.props.onPause();
  }

  handlePlayClick() {
    this.audioContext.play();
    this.props.onPlay();
  }

  handleMuteClick() {
    this.audioContext.volume(0);
  }

  handlePrevClick() {
    const { player, playlist } = this.props;
    const { items } = playlist.toJS();

    items.forEach((item, idx) => {
      if (player.get('id') === item.id) {
        const nextIdx = idx - 1;

        if (items[nextIdx]) {
          this.props.onLoad(items[nextIdx]);
        }
      }
    });
  }

  handleNextClick() {
    const { player, playlist } = this.props;
    const { items } = playlist.toJS();

    items.forEach((item, idx) => {
      if (player.get('id') === item.id) {
        const nextIdx = idx + 1;

        if (items[nextIdx]) {
          this.props.onLoad(items[nextIdx]);
        }
      }
    });
  }

  handleVolumeChange(e, value) {
    this.audioContext.volume(value);
  }
}

export default Controls;
