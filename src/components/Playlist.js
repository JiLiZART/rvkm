import React, { Component } from 'react';
import File from './File';
import Empty from './Empty';
import Scrollable from './Scrollable';
import { List, CircularProgress } from 'material-ui';

export default class Playlist extends Component {
  render() {
    const { playlist, player, onFileClick } = this.props;
    const { fetching, error, items, title } = playlist.toJS();
    const { id } = player.toJS();

    let content;

    if (fetching) {
      content = (<CircularProgress mode="indeterminate" size={1.5}/>);
    }

    if (error) {
      content = 'Error loading groups';
    }

    if (!error && !fetching) {
      if (items.length) {
        content = items.map((item, key) => {
          const current = item.id === id;

          return (<File key={key} file={item} playing={current} onClick={onFileClick}/>);
        });
      } else {
        content = (<Empty>Your list is empty</Empty>);
      }
    }

    return (
      <Scrollable>
        <List className="playlist" subheader={title}>{content}</List>
      </Scrollable>
    );
  }
}
