import React, { Component } from 'react';
import Holder from 'holderjs';

export default class Albums extends Component {

  renderAlbum(album, index) {
    const title = album.get('title');
    const count = album.get('count');

    return (
      <li className="music__albums-item" role="album" key={index}>
        <div className="music__albums-thumbnail thumbnail">
          <img src="holder.js/150x150" alt={title}/>
          <div className="caption">
            <h3>{title} <span className="badge">{count}</span></h3>
          </div>
        </div>
      </li>
    );
  }

  componentDidUpdate() {
    let images = React.findDOMNode(this).getElementsByTagName('img');

    Holder.run({
      images: images
    });
  }

  render() {
    const { albums } = this.props;
    let content = 'Loading...';

    if (!albums.get('pending', false)) {
      content = albums.getIn(['user', 'items']).map(this.renderAlbum.bind(this));
    }

    return (
      <div className="music__albums">
        <ul className="music__albums-list">
          {content}
        </ul>
      </div>
    );
  }
}
