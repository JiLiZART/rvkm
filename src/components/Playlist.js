import React, { Component } from 'react';
import File from './File';
import Empty from './Empty';
import Scrollable from './Scrollable';
import { List } from 'material-ui';

export default class Playlist extends Component {
  render() {
    const { playlist, player, onFileClick } = this.props;
    const { items, pending} = playlist.toJS();
    const { id } = player.toJS();

    let content = null;

    if (pending) {
      content = 'Loading...';
    }

    if (items) {
      content = items.map((item, key) => {
        const current = item.id === id;

        return (<File key={key} file={item} playing={current} onClick={onFileClick} />);
      });
    } else {
      content = (<Empty>Your list is empty</Empty>);
    }

    return (
      <Scrollable>
        <List className="playlist">{content}</List>
      </Scrollable>
    );
  }
}
