import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './Player.js';
import User from './User.js';
import Info from './Info.js';
import Controls from './Controls.js';
import Timeline from './Timeline.js';
import Playlist from './Playlist.js';
import Albums from './Albums.js';
import Groups from './Groups.js';
import Friends from './Friends.js';

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
    routerState: state.router
  };
}) class App extends Component {

  render() {
    const {
      session,
      player,
      playlist,
      albums,
      groups,
      friends,
      routerState,

      dispatch,

      audioContext

      } = this.props;

    console.log('routerState', routerState);

    return (
      <section className={styles.music}>
        <div className={styles.music__col}>
          <User
            session={session}
            onLogout={() => dispatch(actions.session.logout())}
            onLogin={() => dispatch(actions.session.login())}
            />
          <Player>
            <Info player={player} />
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
          <Playlist
            playlist={playlist}
            player={player}
            onFileClick={(file) => dispatch(actions.player.load(file))}
            />
        </div>

        <div className={styles.music__col}>
          <Albums
            albums={albums}
            playlist={playlist}
            onItemClick={(item) => dispatch(actions.playlist.load(item))}
            />
        </div>

        <div className={styles.music__col}>
          <Groups
            groups={groups}
            playlist={playlist}
            onItemClick={(item) => dispatch(actions.groups.load(item))}
            />
        </div>

        <div className={styles.music__col}>
          <Friends
            friends={friends}
            playlist={playlist}
            onItemClick={(item) => dispatch(actions.friends.load(item))}
            />
        </div>
      </section>
    );
  }
}

export default App;
