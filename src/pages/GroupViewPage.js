import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Playlist } from 'components';

import * as actions from 'actions';

@connect((state) => {
  return {
    session: state.session,
    player: state.player,
    playlist: state.playlist,
    groups: state.groups,
    router: state.router
  };
})
class GroupViewPage extends Component {

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
    const { dispatch, playlist, groups, params: { group } } = props;
    const { items } = groups.toJS();
    const id = Number(group);

    if (items[id] && id !== playlist.get('id')) {
      dispatch(actions.groups.load(items[id]));
    }
  }
}

export default GroupViewPage;
