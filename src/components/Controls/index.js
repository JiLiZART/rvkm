import React, {PureComponent} from 'react';
import cn from 'bem-cn';
import './index.styl';

import InputRange from 'components/InputRange';
import Track from 'components/Track';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Popup from 'components/Popup';
import PlayButton from 'components/PlayButton';
import Playlist from 'components/Playlist';

import Audio from 'models/Audio';
import AudioPlayer from 'models/AudioPlayer';

import {connect} from 'react-redux';
import {play, pause, next, prev, volume, mute, max, shuffleToggle, loopToggle, end, playlistToggle} from 'actions/player';

const mapStateToProps = (state) => ({player: state.player.toJS()});

const block = cn('controls');

class Controls extends PureComponent {
  state = {
    volume: 100,
    time: 0
  };

  componentDidMount() {
    const {player} = this.props;

    AudioPlayer.on('progress', () => {
      const info = AudioPlayer.getInfo();
      this.setState({time: info.time});
    });

    AudioPlayer.on('ended', () => {
      if (!player.loop) {
        this.onNextClick();
      }
    });
  }

  onSeqClick = () => {
    const {playlistToggle} = this.props;

    playlistToggle();
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
    const {prev, player} = this.props;
    const {items} = player.playlist;
    let audio;

    if (player.shuffle) {
      audio = items[Math.floor(Math.random() * items.length)];
    } else {
      items.forEach((item, idx) => {
        if (item.id === player.audio.id) {
          audio = idx === 0 ? items[items.length - 1] : items[idx - 1]
        }
      });
    }

    prev(audio);
  };

  onNextClick = () => {
    const {next, player} = this.props;
    const {items} = player.playlist;
    let audio;

    if (player.shuffle) {
      audio = items[Math.floor(Math.random() * items.length)];
    } else {
      items.forEach((item, idx) => {
        if (item.id === player.audio.id) {
          audio = idx === items.length - 1 ? items[0] : items[idx + 1]
        }
      });
    }

    next(audio);
  };

  onVolumeChange = (e) => {
    const value = Number(e.target.value);

    AudioPlayer.volume(value);

    this.setState({volume: value});
  };

  onMuteClick = () => {
    const {mute} = this.props;

    mute();
  };

  onMaxClick = () => {
    const {max} = this.props;

    max();
  };

  onShuffleClick = () => {
    const {shuffleToggle} = this.props;

    shuffleToggle();
  };

  onLoopClick = () => {
    const {loopToggle} = this.props;

    loopToggle();
  };

  render() {
    const {time, volume} = this.state;
    const {player} = this.props;
    const {sampleRate, inPlaylist, playing:isPlaying} = player;
    const audio = Audio.hydrate(player.audio);

    if (!player.audio) {
      return (<div className={block}></div>)
    }

    return (
      <div className={block}>
        <div className={block('playback')}>
          <Button className={block('btn', {prev: true})} onClick={this.onPrevClick} size="m" view="plain" icon={<Icon name="fast_rewind" size="m" style="blue"/>}/>
          <PlayButton className={block('btn', {play: true})} onClick={this.onPlayClick} size="m" playing={isPlaying}/>
          <Button className={block('btn', {next: true})} onClick={this.onNextClick} size="m" view="plain" icon={<Icon name="fast_forward" size="m" style="blue"/>}/>
          <Button className={block('btn', {seq: true})} onClick={this.onSeqClick} size="m" view="plain" icon={<Icon name="playlist_play" light={!inPlaylist} size="m" style="blue"/>}/>
          <Popup visible={inPlaylist} title={player.playlist.title}>
            <Playlist audios={player.playlist}/>
          </Popup>
        </div>
        <div className={block('track-container')}>
          <Track className={block('track')} size="m" id={audio.getId()} url={audio.getUrl()} duration={time} artist={audio.getArtist()} song={audio.getSong()}/>
          <div>{sampleRate} kHz</div>
        </div>
        <div className={block('volume')}>
          <Button className={block('btn', {loop: true})} onClick={this.onLoopClick} size="m" view="plain" icon={<Icon name="repeat" light={!player.loop} size="m" style="blue"/>}/>
          <Button className={block('btn', {shuffle: true})} onClick={this.onShuffleClick} size="m" view="plain" icon={<Icon name="shuffle" light={!player.shuffle} size="m" style="blue"/>}/>
          <Button className={block('btn', {mute: true})} onClick={this.onMuteClick} size="m" view="plain" icon={<Icon name="volume_mute" size="m" style="blue"/>}/>
          <div className={block('volume-slider')}><InputRange value={volume} type='range' max={100} min={0} onChange={this.onVolumeChange}/></div>
          <Button className={block('btn', {max: true})} onClick={this.onMaxClick} size="l" view="plain" icon={<Icon name="volume_up" size="l" style="blue"/>}/>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {play, pause, next, prev, volume, mute, max, shuffleToggle, loopToggle, playlistToggle}
)(Controls);
