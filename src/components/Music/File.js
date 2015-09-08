import React, { Component } from 'react';

export default class File extends Component {
  render() {
    const { file, currentID } = this.props;

    let playing = currentID == file.get('id');
    let state = (<i className="glyphicon glyphicon-play"></i>);

    if (playing) {
      state = (<i className="glyphicon glyphicon-pause"></i>);
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
      <li className="list-group-item" onClick={this.handleClick.bind(this)}>
        {state}&nbsp;{file.get('title')}&nbsp;&mdash;&nbsp;{file.get('artist')}
      </li>
    );
  }

  handleClick() {
    const { file } = this.props;
    this.props.onClick(file);
  }
}
