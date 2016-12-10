import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import Auth from 'components/Auth';
import Navbar from 'components/Navbar';
import Timeline from 'components/Timeline';
import Controls from 'components/Controls';
import {status} from 'actions/user';

import User from 'models/User';
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
  user: new User(state.user),
  player: state.player.toJS()
});

const app = block('app');

class App extends Component {

  componentWillMount() {
    const {user} = this.props;

    if (!user.isLoggedIn()) {
        this.props.userStatus()
    }
  }

  render() {
    const {children, user, player} = this.props;
    const loggedIn = user.isLoggedIn();

    if (loggedIn) {
      return (
        <section className={app({player: !!player.audio.id})}>
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
  mapStateToProps,
  {userStatus: status}
)(App);
