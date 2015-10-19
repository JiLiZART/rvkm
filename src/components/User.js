import React, { Component } from 'react';

import { AppBar, FlatButton } from 'material-ui';

export default class User extends Component {
  render() {
    const { session } = this.props;
    const loggedIn = session.get('mid', false);

    let loginBtn = (<FlatButton label="Logout" onClick={this.handleLogout.bind(this)}/>);

    if (!loggedIn) {
      loginBtn = (<FlatButton label="Login" onClick={this.handleLogin.bind(this)}/>);
    }

    return (
      <AppBar
        title="VK Music"
        iconElementRight={loginBtn}/>
    );
  }

  handleLogout() {
    this.props.onLogout();
  }

  handleLogin() {
    this.props.onLogin();
  }

}
