import React, { Component } from 'react';
import File from './File';

export default class List extends Component {
  renderFile(onFileClick, currentID, item, index) {
    return (<File key={index} file={item} currentID={currentID} onClick={onFileClick}/>);
  }

  render() {
    const { playlist, player, onFileClick } = this.props;
    const currentID = player.getIn(['current', 'id'], 0);
    const pending = playlist.get('pending', false);
    const files = playlist.getIn(['user', 'files']);
    let content = null;

    if (pending) {
      content = 'Loading...';
    }

    console.log('files', files);

    if (files && files.size) {
      content = files.map(this.renderFile.bind(this, onFileClick, currentID));
    } else {
      content = (
        <div className="music__empty">
          <div className="music__empty-icon">
            <i className="glyphicon glyphicon-remove-circle"></i>
          </div>
          <div className="music__empty-message">
            Your list is empty
          </div>
        </div>
      )
    }

    return (
      <div className="music__playlist">
        <ul className="list-group">
          {content}
        </ul>
      </div>
    );
  }
}
