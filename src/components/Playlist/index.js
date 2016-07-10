import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import Track from 'components/Track';
import Icon from 'components/Icon';
import Spinner from 'components/Spinner';
import Error from 'components/Error';

import UserModel from 'models/User';
import Audio from 'models/Audio';
import {connect} from 'react-redux';
import {load, play, pause, playlist as loadPlaylist} from 'actions/player';

const mapStateToProps = (state) => {
  return {
    user: new UserModel(state.user),
    player: state.player
  };
};

const b = block('playlist');

class Playlist extends Component {

  rowRender = (audio, i) => {
    const {player} = this.props;
    const isCurrent = player.audio.id === audio.getId();
    const isPlaying = player.playing;
    const duration = player.time || audio.getDuration();

    return (
      <div className={b('item', {current: isCurrent})} key={i} onClick={() => this.onTrackClick(audio)}>
        <div className={b('controls')}>
          <div className={b('play')}><Icon name={isCurrent && isPlaying ? 'pause' : 'play_arrow'} style="white" size="xs"/></div>
        </div>
        <Track className={b('track')} size="m" id={audio.getId()} duration={duration} artist={audio.getArtist()} song={audio.getSong()}/>
      </div>
    )
  };

  onTrackClick = (audio) => {
    const {load, play, pause, loadPlaylist, playlist, player} = this.props;

    if (player.playlist.id !== playlist.id) {
      loadPlaylist(playlist);
    }

    if (player.audio.id !== audio.id) {
      load(audio);
      play();
    } else {
      if (player.playing) {
        pause();
      } else {
        play();
      }
    }
  };

  render() {
    const {playlist} = this.props;

    if (!playlist) {
      return (
        <section className={b}>
          <div className={b('loading')}><Error title="Ничего не выбрано" desc="Выберите элемент из списка слева" /></div>
        </section>
      );
    }

    if (playlist.error) {
      return (
        <section className={b}>
          <div className={b('loading')}><Error title="Произошла Ошибка" desc={playlist.error.error_msg} /></div>
        </section>
      );
    }

    if (playlist.fetching) {
      return (
        <section className={b}>
          <div className={b('loading')}><Spinner size="lg" type="primary"/></div>
        </section>
      );
    }

    if (playlist.items && playlist.items.length === 0) {
      return (
        <section className={b}>
          <div className={b('loading')}><Error title="Список пуст" /></div>
        </section>
      );
    }

    return (
      <section className={b}>
        {Audio.hydrateArray(playlist.items || []).map(this.rowRender)}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  {load, play, pause, loadPlaylist}
)(Playlist);
