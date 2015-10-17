import React, { Component } from 'react';
import File from './File';
import Empty from './Empty';
import Scrollable from './Scrollable';

export default class Playlist extends Component {
  render() {
    const { playlist, onFileClick } = this.props;
    const { id, count, items, pending} = playlist.toJS();

    let content = null;

    if (pending) {
      content = 'Loading...';
    }

    if (items) {
      content = items.map((item, key) => {
        return (<File key={key} file={item} currentID={id} onClick={onFileClick} />);
      });
    } else {
      content = (<Empty>Your list is empty</Empty>);
    }

    return (
      <Scrollable>
        <div className="playlist">
          <ul className="playlist__items list-group">
            {content}
          </ul>
        </div>
      </Scrollable>
    );
  }
}
