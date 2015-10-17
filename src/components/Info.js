import React, { Component } from 'react';

export default class Info extends Component {

  render() {
    const { player } = this.props;
    const artist = player.getIn(['file', 'artist'], '');
    const title = player.getIn(['file', 'title'], '');

    return (
      <div className="player__info">
        <div className="player__left">
          <i className="fa fa-random"></i>
          <i className="fa fa-heart"></i>
        </div>
        <div className="player__center">
          <div className="player__current">
            <span className="player__title">{title}</span>
            <span className="player__artist">{artist}</span>
          </div>
        </div>
        <div className="player__right">
          <i className="fa fa-repeat"></i>
          <i className="fa fa-share"></i>
        </div>
      </div>
    );
  }
}
