import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Playlist } from 'components';

import * as actions from 'actions';

@connect((state) => {
  return {
    session: state.session,
    player: state.player,
    playlist: state.playlist,
    albums: state.albums,
    router: state.router
  };
})
class PlaylistPage extends Component {

  componentDidMount() {
    this.loadPlaylistData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadPlaylistData(nextProps);
  }

  render() {
    const {
      playlist,
      player,
      dispatch
      } = this.props;

    return (
      <Playlist player={player} playlist={playlist} onFileClick={(file) => dispatch(actions.player.load(file))}/>
    );
  }

  loadPlaylistData(props) {
    const { dispatch, playlist, albums, params: { album } } = props;
    const { items } = albums.toJS();
    const id = Number(album);

    if (items[id] && id !== playlist.get('id')) {
      dispatch(actions.albums.load(items[id]));
    }
  }
}

export default PlaylistPage;
