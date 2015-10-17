import React, { Component } from 'react';

export default class File extends Component {
  render() {
    const { file, currentID } = this.props;
    const { id, url, title, artist } = file;
    const playing = currentID == id;
    let state;

    if (playing) {
      state = (<i className="glyphicon glyphicon-pause"></i>);
    } else {
      state = (<i className="glyphicon glyphicon-play"></i>);
    }

    /**
     artist: "Амалия Маргарян"
     date: 1440618869
     duration: 136
     genre_id: 18
     id: 390880461
     owner_id: 11109110
     title: " Rise Like a Phoenex"
     url: "https://psv4.vk.me/c613820/u207424424/audios/1cc560c914fe.mp3?extra=nNCreCtwYjk_IwRnIrAAy7KsH1LwXKbwLam9alGut8sxOtAUiB1GRMR6lUoJbFZWXkiHytkv2j_meVU8wiojkkg7Om5_ZDI"
     */
    return (
      <li className="playlist__item list-group-item file" onClick={this.handleClick.bind(this)}>
        <span className="file__title">{state}&nbsp;{title}</span>
        <span className="file__artist">{artist}</span>
      </li>
    );
  }

  handleClick() {
    const { file } = this.props;
    this.props.onClick(file);
  }
}
