import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import block from 'bem-cn';
import './index.styl';

import Icon from 'components/Icon';
import Button from 'components/Button';

import {connect} from 'react-redux';
import {add, remove} from 'actions/audios';

const b = block('track');

const pad = (val) => (val < 10 ? '0' + val : val);

const formatDuration = (sec) => {
  const hours = parseInt(sec / 3600);
  const minutes = parseInt(sec / 60) % 60;
  const seconds = sec % 60;
  let time = '';

  if (hours) time += pad(hours) + ':';
  if (minutes) time += pad(minutes) + ':';

  return time + pad(seconds);
};

const downloadLink = (artist, song, url) => {
  const icon = (<Icon name="file_download" size="s" light={true} style="blue"/>);

  return (
    <a href={url} download={`${artist} - ${song}.mp3`}>
      <Button className={b('btn', {download: true})} size="s" view="plain" icon={icon}/>
    </a>
  );
};

class Track extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const props = this.props;

    return props.duration !== nextProps.duration
      || props.id !== nextProps.id
      || props.className !== nextProps.className;
  }

  onRemoveClick = (audioID) => this.props.onRemoveClick(audioID);

  onAddClick = (audioID) => this.props.onAddClick(audioID);

  render() {
    const {className, size, artist, song, duration, id, url, canBeAdded, canBeRemoved} = this.props;
    const buttons = [];

    console.log('Track.render');

    canBeAdded && buttons.push(
      <Button
        className={b('btn', {add: true})}
        onClick={() => this.onAddClick(id)}
        size="s"
        view="plain"
        icon={<Icon name="add" size="s" light={true} style="blue"/>}
      />
    );

    canBeRemoved && buttons.push(
      <Button
        className={b('btn', {add: true})}
        onClick={() => this.onRemoveClick(id)}
        size="s"
        view="plain"
        icon={<Icon name="clear" size="s" light={true} style="blue"/>}
      />
    );

    return (
      <div className={b({size}).mix(className)}>
        <span className={b('content')}>
          <span className={b('left')}>
            <span
              className={b('artist')}>{artist}</span><span
            className={b('divider')}>&nbsp;&mdash;&nbsp;</span><span
            className={b('song')}>{song}</span>
          </span>
          <span className={b('right')}>
            <span className={b('duration')}>{formatDuration(duration)}</span>
            <span className={b('controls')}>
              {buttons}
              {downloadLink(artist, song, url)}
            </span>
          </span>
        </span>
      </div>
    );
  }
}

export default Track;
