import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './Player.js';
import User from './User.js';
import Info from './Info.js';
import Controls from './Controls.js';
import Timeline from './Timeline.js';
import Playlist from './Playlist.js';
import Albums from './Albums.js';
import Scrollable from './Scrollable.js';
import Groups from './Groups.js';
import Friends from './Friends.js';

import * as actions from '../actions';

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

      audioContext,
      } = this.props;

    return (
      <section className="music">
        <div className="music__col">
          <User
            session={session}
            onLogout={() => dispatch(actions.session.logout())}
            onLogin={() => dispatch(actions.session.login())}
            />
          <Player>
            <Info
              player={player}
              />
            <Timeline
              player={player}
              audioContext={audioContext}
              onProgress={val => dispatch(actions.player.progress(val))}
              onSeek={pos => dispatch(actions.player.seek(pos))}
              onSeekEnd={() => dispatch(actions.player.seekEnd())}
              onEnd={() => dispatch(actions.player.end())}
              />
            <Controls
              player={player}
              audioContext={audioContext}
              onPlay={() => dispatch(actions.player.play())}
              onPause={() => dispatch(actions.player.pause())}
              onPrev={() => dispatch(actions.player.prev())}
              onNext={() => dispatch(actions.player.next())}
              onVolume={(value) => dispatch(actions.player.volume(value))}
              />
          </Player>
          <Playlist
            playlist={playlist}
            player={player}
            onFileClick={(file) => dispatch(actions.player.load(file))}
            />
        </div>

        <div className="music__col">
          <Albums
            albums={albums}
            playlist={playlist}
            onItemClick={(item) => dispatch(actions.playlist.load(item))}
          />
        </div>

        <div className="music__col">
          <Groups
            groups={groups}
            playlist={playlist}
            onItemClick={(item) => dispatch(actions.playlist.load(item))}
           />
        </div>

        <div className="music__col">
          <Friends
            friends={friends}
            playlist={playlist}
            onItemClick={(item) => dispatch(actions.playlist.load(item))}
           />
        </div>
      </section>
    );
  }
}

export default App;
