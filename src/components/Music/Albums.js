import React, { Component } from 'react';
import Holder from 'holderjs';

export default class Albums extends Component {

  renderAlbum(album, index) {
    const { title, count } = album;

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
    let content = 'Loading...';

    if (this.props.albums) {
      const albums = this.props.albums.toJS();

      if (!albums.pending && albums.items) {
        content = Object.keys(albums.items).map((key) => {
          return this.renderAlbum(albums.items[key]);
        });
      }
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
