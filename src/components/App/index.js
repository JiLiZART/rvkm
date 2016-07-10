import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import Auth from 'components/Auth';
import Navbar from 'components/Navbar';
import Timeline from 'components/Timeline';
import Controls from 'components/Controls';
import 'react-virtualized/styles.css';

import User from 'models/User';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: new User(state.user),
    player: state.player,
    menu: state.menu
  };
};

const app = block('app');

class App extends Component {

  render() {
    const {children, user, menu, player} = this.props;
    const loggedIn = user.getId();

    if (loggedIn) {
      return (
        <section className={app({menu: menu.visible, player: !!player.audio.id})}>
          <div className={app('bar', {visible: !!player.audio.id})}>
            <Timeline />
            <Controls />
          </div>
          <div className={app('header')}>
            <Navbar />
          </div>
          <div className={app('body')}>
            {children}
          </div>
        </section>
      );
    }

    return (
      <section className={app}>
        <div className={app('body')}>
          <Auth />
        </div>
      </section>
    );
  }
}

export default connect(
  mapStateToProps
)(App);
