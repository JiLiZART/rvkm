import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  User,
  Player,
  Info,
  Timeline,
  Controls
} from 'components';

import { CircularProgress, List, ListItem } from 'material-ui';

import * as actions from 'actions';

import styles from 'styles/blocks/music.styl';

@connect((state) => {
  return {
    session: state.session,
    player: state.player,
    playlist: state.playlist,
    albums: state.albums,
    groups: state.groups,
    friends: state.friends,
    router: state.router
  };
}) class AppPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedin: false
    };
  }

  componentDidMount() {
    const { store } = this.props.route;

    store.subscribe(this.onStoreChanges.bind(this));
  }

  onStoreChanges() {
    const { store } = this.props.route;
    const { session } = store.getState();

    this.setState({
      loggedin: session.get('mid')
    });
  }

  render() {
    const {
      session,
      player,
      playlist,
      children,
      dispatch
      } = this.props;

    const { loggedin } = this.state;

    const audioContext = this.props.route.store.audio;

    if (!loggedin) {
      return (
        <section className={styles.music}>
          <User
            session={session}
            onLogout={() => dispatch(actions.session.logout())}
            onLogin={() => dispatch(actions.session.login())}
            />
        </section>
      );
    }

    return (
      <section className={styles.music}>
        <User
          session={session}
          onLogout={() => dispatch(actions.session.logout())}
          onLogin={() => dispatch(actions.session.login())}
          />

        <div className={styles.music__col}>
          <Player>
            <Info player={player}/>
            <Timeline
              audioContext={audioContext}
              onProgress={val => dispatch(actions.player.progress(val))}
              onSeek={pos => dispatch(actions.player.seekStart(pos))}
              onEnd={() => dispatch(actions.player.end())}
              />
            <Controls
              audioContext={audioContext}
              playlist={playlist}
              player={player}
              onPlay={() => dispatch(actions.player.play())}
              onLoad={(file) => dispatch(actions.player.load(file))}
              onPause={() => dispatch(actions.player.pause())}
              onVolume={(value) => dispatch(actions.player.volume(value))}
              onPrev={(file) => dispatch(actions.player.load(file))}
              onNext={(file) => dispatch(actions.player.load(file))}
              onSeekEnd={() => dispatch(actions.player.seekEnd())}
              />
          </Player>
        </div>

        <div className={styles.music__col}>
          <List className="menu">
            <ListItem primaryText="Albums" href="#/albums"/>
            <ListItem primaryText="Groups" href="#/groups"/>
            <ListItem primaryText="Friends" href="#/friends"/>
          </List>
        </div>

        {children}

      </section>
    );
  }
}

export default AppPage;
