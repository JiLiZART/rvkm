import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
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

import {play, pause, next, prev, volume, mute, max, shuffleToggle, loopToggle, end, playlistToggle, loadAndPlay} from 'actions/player';

const mapStateToProps = (state) => {
  const player = state.player.toJS();

  return {
    player,
    audio: player.audio ? Audio.hydrate(player.audio) : null,
    playlist: player.playlist,
    isPlaying: player.playing
  };
};

const b = cn('controls');

class Controls extends PureComponent {
  state = {
    volume: 100,
    time: 0
  };

  componentDidMount() {
    const {player:{loop, playing}, loadAndPlay, audio} = this.props;

    AudioPlayer.on('progress', () => {
      const info = AudioPlayer.getInfo();
      this.setState({time: info.time});
    });

    AudioPlayer.on('ended', () => {
      !loop && this.onNextClick();
    });

    if (playing && audio.getId()) {
      loadAndPlay(audio)
    }
  }

  onSeqClick = () => this.props.playlistToggle();

  onPlayClick = () => {
    const {play, pause, player:{playing}} = this.props;

    playing ? pause() : play();
  };

  onPrevClick = () => {
    const {prev, player} = this.props;
    const {playlist:{items}, shuffle, audio} = player;
    let prevAudio;

    if (shuffle) {
      prevAudio = this._randomIndex(items);
    } else {
      items.forEach((item, idx) => {
        if (item.id === audio.id) {
          prevAudio = this._prevItem(idx, items)
        }
      });
    }

    prevAudio && prev(prevAudio);
  };

  onNextClick = () => {
    const {next, player} = this.props;
    const {playlist:{items}, shuffle, audio} = player;
    let nextAudio;

    if (shuffle) {
      nextAudio = this._randomIndex(items);
    } else {
      items.forEach((item, idx) => {
        if (item.id === audio.id) {
          nextAudio = this._nextItem(idx, items);
        }
      });
    }

    nextAudio && next(nextAudio);
  };

  _nextItem = (idx, items) => idx === items.length - 1 ? items[0] : items[idx + 1];

  _prevItem = (idx, items) => idx === 0 ? items[items.length - 1] : items[idx - 1];

  _randomIndex = (items) => items[Math.floor(Math.random() * items.length)];

  onVolumeChange = (e) => {
    const volume = Number(e.target.value);

    //AudioPlayer.volume(value);
    this.props.volume(volume);
    this.setState({volume});
  };

  onMuteClick = () => this.props.mute();

  onMaxClick = () => this.props.max();

  onShuffleClick = () => this.props.shuffleToggle();

  onLoopClick = () => this.props.loopToggle();

  render() {
    const {time, volume} = this.state;
    const {player, audio, playlist, isPlaying} = this.props;
    const {sampleRate, inPlaylist} = player;
    console.log('Controls.render');

    if (!audio) {
      return (<div className={b}></div>)
    }

    return (
      <div className={b}>
        <div className={b('playback')}>
          <Button className={b('btn', {prev: true})} onClick={this.onPrevClick} size="m" view="plain" icon={<Icon name="fast_rewind" size="m" style="blue"/>}/>
          <PlayButton className={b('btn', {play: true})} onClick={this.onPlayClick} size="m" playing={isPlaying} loading={audio.fetching} />
          <Button className={b('btn', {next: true})} onClick={this.onNextClick} size="m" view="plain" icon={<Icon name="fast_forward" size="m" style="blue"/>}/>
          <Button className={b('btn', {seq: true})} onClick={this.onSeqClick} size="m" view="plain" icon={<Icon name="playlist_play" light={!inPlaylist} size="m" style="blue"/>}/>
          <Popup visible={inPlaylist} title={playlist.title}>
            <Playlist audios={playlist}/>
          </Popup>
        </div>
        <div className={b('track-container')}>
          <Track className={b('track')} size="m" id={audio.getId()} url={audio.getUrl()} duration={time} artist={audio.getArtist()} song={audio.getSong()}/>
          <div>{sampleRate} kHz</div>
        </div>
        <div className={b('volume')}>
          <Button className={b('btn', {loop: true})} onClick={this.onLoopClick} size="m" view="plain" icon={<Icon name="repeat" light={!player.loop} size="m" style="blue"/>}/>
          <Button className={b('btn', {shuffle: true})} onClick={this.onShuffleClick} size="m" view="plain" icon={<Icon name="shuffle" light={!player.shuffle} size="m" style="blue"/>}/>
          <Button className={b('btn', {mute: true})} onClick={this.onMuteClick} size="m" view="plain" icon={<Icon name="volume_mute" size="m" style="blue"/>}/>
          <div className={b('volume-slider')}><InputRange value={volume} type='range' max={100} min={0} onChange={this.onVolumeChange}/></div>
          <Button className={b('btn', {max: true})} onClick={this.onMaxClick} size="l" view="plain" icon={<Icon name="volume_up" size="l" style="blue"/>}/>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {play, pause, next, prev, volume, mute, max, shuffleToggle, loopToggle, playlistToggle, loadAndPlay}
)(Controls);
