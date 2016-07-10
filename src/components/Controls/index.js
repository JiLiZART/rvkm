import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import InputRange from 'components/InputRange';
import Track from 'components/Track';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Popup from 'components/Popup';
import Playlist from 'components/Playlist';

import Audio from 'models/Audio';
import AudioPlayer from 'models/AudioPlayer';
import saveAs from 'file-saver';

import {connect} from 'react-redux';
import {play, pause, next, prev, volume} from 'actions/player';

const mapStateToProps = (state) => {
  return {
    player: state.player
  };
};

const controls = block('controls');

class Controls extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      inPlaylist: false,
      time: 0
    }
  }

  componentDidMount() {
    AudioPlayer.on('progress', () => {
      this.setState(AudioPlayer.getInfo());
    });
  }

  onSeqClick = () => {
    const {inPlaylist} = this.state;

    this.setState({
      inPlaylist: !inPlaylist
    });
  };

  onPlayClick = () => {
    const {play, pause, player} = this.props;

    if (player.playing) {
      pause();
    } else {
      play();
    }
  };

  onPrevClick = () => {
    const {prev} = this.props;

    prev();
  };

  onNextClick = () => {
    const {next} = this.props;

    next();
  };

  onVolumeChange = (component, value) => {
    const {volume} = this.props;

    volume(value);
  };

  onDownloadClick = () => {
    const {player:{audio}} = this.props;

    window.location.href = audio.url;
  };

  onClearClick = () => {};
  onAddClick = () => {};

  onMuteClick = () => {
  };
  
  onMaxClick = () => {
  };

  render() {
    const {inPlaylist, time} = this.state;
    const {player} = this.props;
    const audio = Audio.hydrate(player.audio);
    const isPlaying = player.playing;

    if (!player.audio) {
      return (<div className={controls}></div>)
    }

    return (
      <div className={controls}>
        <div className={controls('playback')}>
          <Button className={controls('btn', {prev: true})} onClick={this.onPrevClick} size="m" view="plain" icon={<Icon name="fast_rewind" size="m" />}/>
          <Button className={controls('btn', {play: true})} onClick={this.onPlayClick} size="l" view="plain" icon={<Icon name={isPlaying ? 'pause' : 'play_arrow'} size="l" />}/>
          <Button className={controls('btn', {next: true})} onClick={this.onNextClick} size="m" view="plain" icon={<Icon name="fast_forward" size="m" />}/>
          <Button className={controls('btn', {seq: true})} onClick={this.onSeqClick} size="m" view="plain" icon={<Icon name="playlist_play" size="m" />}/>

          <div className={controls('track-controls')}>
            <Button className={controls('btn', {remove: true})} onClick={this.onClearClick} size="s" view="plain" icon={<Icon name="clear" size="s" />}/>
            <Button className={controls('btn', {add: true})} onClick={this.onAddClick} size="s" view="plain" icon={<Icon name="add" size="s" />}/>
            <Button className={controls('btn', {save: true})} onClick={this.onDownloadClick} size="s" view="plain" icon={<Icon name="file_download" size="s" />}/>
          </div>
          <Popup visible={inPlaylist} title={player.playlist.title}>
            <Playlist playlist={player.playlist}/>
          </Popup>
        </div>
        <div className={controls('track-container')}>
          <Track className={controls('track')} size="m" duration={time || audio.getDuration()} artist={audio.getArtist()} song={audio.getSong()}/>
        </div>
        <div className={controls('volume')}>
          <Button className={controls('btn', {mute: true})} onClick={this.onMuteClick} size="m" view="plain" icon={<Icon name="volume_mute" size="m" />}/>
          <div className={controls('volume-slider')}><InputRange value={player.volume} maxValue={100} minValue={0} onChange={this.onVolumeChange}/></div>
          <Button className={controls('btn', {max: true})} onClick={this.onMaxClick} size="l" view="plain" icon={<Icon name="volume_up" size="l" />}/>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {play, pause, next, prev, volume}
)(Controls);
