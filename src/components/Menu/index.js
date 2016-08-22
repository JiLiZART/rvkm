import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import Icon from 'components/Icon';
import Avatar from 'components/Avatar';
import {Link} from 'react-router';
import {AutoSizer, VirtualScroll} from 'react-virtualized';

const menu = block('menu');

class Menu extends Component {

  rowRender = (item) => {
    return (
      <div className={menu('item', {active: item.active})} key={item.id}>
        <Link className={menu('link')} to={item.url}>
          {item.cover ? <span className={menu('cover')}><Avatar className={menu('icon')} src={item.cover} size="l" alt={item.name}/></span> : null}
          <span className={menu('text')}>{item.name}</span>
          {item.count ? <span className={menu('count')}>{item.count}</span> : null}
        </Link>
      </div>
    );
  };

  render() {
    const {items} = this.props;

    return (
      <div className={menu}>
        {(items || []).map(this.rowRender)}
      </div>
    );
  }
}
export default Menu;
