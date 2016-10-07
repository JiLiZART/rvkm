import React from 'react';
import block from 'bem-cn';
import './index.styl';

import Icon from 'components/Icon';
import Avatar from 'components/Avatar';
import User from 'models/User';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {toggle} from 'actions/menu';
import {logout} from 'actions/user';

const mapStateToProps = (state) => {
  return {
    user: new User(state.user),
    menu: state.menu
  };
};

const navbar = block('navbar');

const Navbar = ({toggle, logout, menu, user}) => (
  <div className={navbar}>
    <div className={navbar('content')}>
      <div className={navbar('item', {menu: true})}>
        <div className={navbar('menu')} onClick={() => toggle()}><Icon name={menu.visible ? 'close' : 'menu'} style="white" size="m"/></div>
      </div>
      <div className={navbar('item')}>
        <Link activeClassName={String(navbar('link', {active:true}))} className={navbar('link')} to="/albums/">
          <span className={navbar('icon')}><Icon name="headset" style="white" size="m" /></span>
          <span className={navbar('text')}>My</span>
        </Link>
      </div>
      <div className={navbar('item')}>
        <Link activeClassName={String(navbar('link', {active:true}))} className={navbar('link')} to="/friends/">
          <span className={navbar('icon')}><Icon name="person" style="white" size="m" /></span>
          <span className={navbar('text')}>Friends</span>
        </Link>
      </div>
      <div className={navbar('item')}>
        <Link activeClassName={String(navbar('link', {active:true}))} className={navbar('link')} to="/groups/">
          <span className={navbar('icon')}><Icon name="group" style="white" size="m" /></span>
          <span className={navbar('text')}>Groups</span>
        </Link>
      </div>
      <div className={navbar('item', {align:'right'})}>
        <div className={navbar('link')} onClick={() => logout()}>
          <span className={navbar('icon')}><Avatar src={user.getAvatar()} size="m" alt={user.getName()}/></span>
          <span className={navbar('text')}>{user.getName()}</span>
          <span className={navbar('icon')}><Icon name="exit" style="white" size="m" /></span>
        </div>
      </div>
    </div>
  </div>
);

export default connect(
  mapStateToProps,
  {toggle, logout}
)(Navbar);
