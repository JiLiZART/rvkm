import React, { Component } from 'react';

import { AppBar, MenuItem, IconMenu, IconButton } from 'material-ui';
import FileFolderIcon from 'material-ui/lib/svg-icons/file/folder';
import MoreIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

export default class User extends Component {
  render() {
    const { session } = this.props;
    const loggedIn = session.get('mid', false);

    let loginBtn = (<MenuItem primaryText="Logout" index={1} onTouchTap={this.handleLogout.bind(this)}/>);

    if (!loggedIn) {
      loginBtn = (<MenuItem primaryText="Login" index={1} onTouchTap={this.handleLogin.bind(this)}/>);
    }

    return (
      <AppBar
        title="VK Music"
        iconElementRight={
          <IconMenu
          iconStyle={<FileFolderIcon />}
          iconButtonElement={
            <IconButton><MoreIcon /></IconButton>
          }>
            {loginBtn}
          </IconMenu>
      }/>
    );
  }

  handleLogout() {
    this.props.onLogout();
  }

  handleLogin() {
    this.props.onLogin();
  }

}
