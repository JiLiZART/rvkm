import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Groups } from 'components';
import { CircularProgress } from 'material-ui';

import * as actions from 'actions';

import styles from 'styles/blocks/music.styl';

@connect((state) => {
  return {
    session: state.session,
    player: state.player,
    playlist: state.playlist,
    groups: state.groups,
    router: state.router
  };
}) class GroupsPage extends Component {

  componentDidMount() {
    const { dispatch, session } = this.props;

    dispatch(actions.groups.fetch(session.get('mid')));
  }

  render() {
    const {
      children,
      playlist,
      groups
      } = this.props;

    if (groups.get('items').size) {
      return (
        <div>
          <section className={styles.music__col}>
            <Groups groups={groups} playlist={playlist} />
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

export default GroupsPage;
