import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Albums } from 'components';
import { CircularProgress } from 'material-ui';

import * as actions from 'actions';

import styles from 'styles/blocks/music.styl';

@connect((state) => {
  return {
    session: state.session,
    player: state.player,
    playlist: state.playlist,
    albums: state.albums,
    router: state.router
  };
}) class AlbumsPage extends Component {

  componentDidMount() {
    const { dispatch, session } = this.props;

    dispatch(actions.albums.fetch(session.get('mid')));
  }

  render() {
    const {
      children,
      playlist,
      albums
      } = this.props;

    if (albums.get('items').size) {
      return (
        <div>
          <section className={styles.music__col}>
            <Albums albums={albums} playlist={playlist} onItemClick={(item) => dispatch(actions.albums.load(item))}/>
          </section>
          <section className={styles.music__col}>
            {children}
          </section>
        </div>
      );
    }

    return (<CircularProgress mode="indeterminate" size={1.5}/>);
  }
}

export default AlbumsPage;
