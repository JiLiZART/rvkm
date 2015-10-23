import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Friends } from 'components';
import { CircularProgress } from 'material-ui';

import * as actions from 'actions';

import styles from 'styles/blocks/music.styl';

@connect((state) => {
  return {
    session: state.session,
    player: state.player,
    playlist: state.playlist,
    friends: state.friends,
    router: state.router
  };
}) class FriendsPage extends Component {

  componentDidMount() {
    const { dispatch, session } = this.props;

    dispatch(actions.friends.fetch(session.get('mid')));
  }

  render() {
    const {
      children,
      playlist,
      friends
      } = this.props;

    if (friends.get('items').size) {
      return (
        <div>
          <section className={styles.music__col}>
            <Friends friends={friends} playlist={playlist} />
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

export default FriendsPage;
