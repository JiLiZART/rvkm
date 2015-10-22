import React, { Component } from 'react';

import { AppBar, FlatButton } from 'material-ui';

export default class User extends Component {
  render() {
    const { session, onLogout, onLogin } = this.props;
    const loggedIn = session.get('mid', false);

    let loginBtn = (<FlatButton label="Logout" onClick={() => onLogout()}/>);

    if (!loggedIn) {
      loginBtn = (<FlatButton label="Login" onClick={() => onLogin()}/>);
    }

    return (
      <AppBar
        title="VK Music"
        iconElementRight={loginBtn}/>
    );
  }
}
