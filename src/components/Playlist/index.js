import React, {PureComponent} from 'react';
import block from 'bem-cn';
import './index.styl';

import Track from 'components/Track';
import Spinner from 'components/Spinner';
import Error from 'components/Error';
import PlayButton from 'components/PlayButton';
import InfiniteScroll from 'redux-infinite-scroll';

import User from 'models/User';
import Audio from 'models/Audio';

import {connect} from 'react-redux';
import {loadAndPlay, play, pause, playlist as loadPlaylist} from 'actions/player';

const mapStateToProps = (state) => ({
  user: new User(state.user),
  player: state.player.toJS()
});

const b = block('playlist');

const errorMessage = (error) => (
  <section className={b}>
    <div className={b('loading')}><Error title="An error has occurred" desc={error}/></div>
  </section>
);

const notSelectedMessage = () => (
  <section className={b}>
    <div className={b('loading')}><Error title="Nothing selected" desc="Please, select some items in list"/></div>
  </section>
);

const loadingMessage = () => (
  <section className={b}>
    <div className={b('loading')}><Spinner size="lg" type="primary"/></div>
  </section>
);

const emptyMessage = () => (
  <section className={b}>
    <div className={b('loading')}><Error title="List is empty"/></div>
  </section>
);

class Playlist extends PureComponent {

  rowRender = (audio, i) => {
    const {player} = this.props;
    const isCurrent = player.audio.id === audio.getId();
    const isPlaying = player.playing;
    const duration = audio.getDuration();

    return (
      <div className={b('item', {current: isCurrent})} key={i}>
        <div className={b('controls')}>
          <PlayButton className={b('play')} onClick={() => this.onTrackClick(audio)} playing={isCurrent && isPlaying} size="xs"/>
        </div>
        <Track className={b('track')} size="m" id={audio.getId()} url={audio.getUrl()} duration={duration} artist={audio.getArtist()} song={audio.getSong()}/>
      </div>
    )
  };

  onTrackClick = (audio) => {
    const {loadAndPlay, play, pause, loadPlaylist, audios, player} = this.props;

    if (player.playlist.id !== audios.id) {
      loadPlaylist(audios);
    }

    if (player.audio.id !== audio.id) {
      loadAndPlay(audio);
    } else {
      if (player.playing) {
        pause();
      } else {
        play();
      }
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    const props = this.props;

    return props.audios !== nextProps.audios;
  }

  _getAudios() {
    return this.props.audios;
  }

  render() {
    const {audios, onMore} = this.props;

    if (!audios) {
      return notSelectedMessage();
    }

    if (audios.error && audios.error.error_msg) {
      return errorMessage(audios.error.error_msg)
    }

    if (audios.fetching || !audios.items) {
      return loadingMessage();
    }

    if (audios.items && audios.items.length === 0) {
      return emptyMessage();
    }

    return (<InfiniteScroll className={b}
                            threshold={100}
                            elementIsScrollable={false}
                            loadingMore={audios.fetching}
                            loadMore={onMore}
                            showLoader={true}
                            items={this._renderAudios()}
                            hasMore={audios.count >= audios.items.length}/>);
  }

  _renderAudios() {
    return Audio.hydrateArray(this.props.audios.items || []).map(this.rowRender);
  }
}

export default connect(
  mapStateToProps,
  {loadAndPlay, play, pause, loadPlaylist}
)(Playlist);
