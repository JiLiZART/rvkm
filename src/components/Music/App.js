import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './Player.js';
import Timeline from './Timeline.js';
import List from './List.js';
import Albums from './Albums.js';
import Scrollable from '../Scrollable.js';

import * as actionCreators from '../../actions/MusicAction.js';

const APP_ID = '4966083';

@connect((state) => {
  return {
    player: state.player,
    playlist: state.playlist,
    albums: state.albums,
    session: state.session
  };
}, actionCreators)
class App extends Component {

  appendScript() {
    let el;
    let transport;

    transport = document.getElementById('vk-api-transport');
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = '//vk.com/js/api/openapi.js';
    el.async = true;

    if (transport) {
      transport.appendChild(el);
    }
  }

  componentDidMount() {
    const { vkInit } = this.props;

    this.appendScript();

    window.vkAsyncInit = function vkAsyncInit() {
      VK.init({apiId: APP_ID});
      vkInit(VK);
    };
  }

  render() {
    const {
      session,
      playlist,
      albums,
      player,
      userLogin,
      userLogout,

      playerPlay,
      playerLoad,
      playerPause,
      playerProgress,
      playerPrev,
      playerNext,
      playerMuteToggle,
      playerEnd
    } = this.props;

    let loginBtn = (<div onClick={() => userLogout()}>Logout</div>);

    if (! session.get('mid', false)) {
      loginBtn = (<div onClick={() => userLogin()}>Login</div>);
    }

    return (
      <section className="music">
        <div className="music__header">
          <div className="music__navbar">
            <div className="music__navbar-panel">
              <div className="music__navbar-left">
                <div className="music__navbar-btn">
                  <i className="glyphicon glyphicon-th-list"></i>
                </div>
                <div className="music__navbar-btn">{loginBtn}</div>
              </div>
              <div className="music__navbar-center">
                <Player player={player}
                        onPlayClick={() => playerPause()}
                        onPauseClick={() => playerPlay()}
                        onPrevClick={() => playerPrev()}
                        onNextClick={() => playerNext()}
                        onMuteClick={() => playerMuteToggle()}
                        onProgress={(e) => playerProgress(e)}
                        onEnd={() => playerEnd()}
                  />
              </div>
            </div>
            <div className="music__navbar-timeline">
              <Timeline player={player} />
            </div>
          </div>
        </div>

        <div className="music__side">
          <Scrollable>
            <Albums albums={albums} playlist={playlist} />
          </Scrollable>
        </div>
        <div className="music__content">
          <Scrollable>
            <List playlist={playlist} player={player} onFileClick={(file) => playerLoad(file)}/>
          </Scrollable>
        </div>
        <div id="vk-api-transport"></div>
      </section>
    );
  }
}

export default App;
