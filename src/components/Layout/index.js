import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import Menu from 'components/Menu';
import Playlist from 'components/Playlist';

const b = block('layout');

const Layout = ({menu, items, audios, onMore}) => (
  <section className={b({menu: menu})}>
    <div className={b('nav')}>
      <Menu items={items}/>
    </div>
    <div className={b('content')}><Playlist audios={audios} onMore={onMore}/></div>
  </section>
);

export default Layout;
