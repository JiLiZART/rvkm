import React, { Component } from 'react';
import { ListItem } from 'material-ui';
import PlayIcon from 'material-ui/lib/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/lib/svg-icons/av/pause';

export default class File extends Component {
  render() {
    const { file, playing, onClick } = this.props;
    const { title, artist } = file;
    let state;

    if (playing) {
      state = (<PauseIcon />);
    } else {
      state = (<PlayIcon />);
    }

    return (
      <ListItem className="playlist__item file"
                leftIcon={state}
                primaryText={title}
                secondaryText={artist}
                onClick={() => onClick(file)}/>
    );
  }
}
