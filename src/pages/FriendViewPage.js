import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Playlist } from 'components';

import * as actions from 'actions';

@connect((state) => {
  return {
    session: state.session,
    player: state.player,
    playlist: state.playlist,
    friends: state.friends,
    router: state.router
  };
})
class FriendViewPage extends Component {

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
    const { dispatch, playlist, friends, params: { friend } } = props;
    const { items } = friends.toJS();
    const id = Number(friend);

    if (items[id] && id !== playlist.get('id')) {
      dispatch(actions.friends.load(items[id]));
    }
  }
}

export default FriendViewPage;
