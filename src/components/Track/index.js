import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import block from 'bem-cn';
import './index.styl';

import Icon from 'components/Icon';
import Button from 'components/Button';

import User from 'models/User';

import {connect} from 'react-redux';
import {add, remove} from 'actions/audios';

const b = block('track');

const mapStateToProps = (state) => ({
  player: state.player,
  user: new User(state.user)
});

const formatDuration = (sec) => {
  const hours = parseInt(sec / 3600);
  const minutes = parseInt(sec / 60) % 60;
  const seconds = sec % 60;
  const pad = (val) => (val < 10 ? '0' + val : val);
  let time = '';

  if (hours) time += pad(hours) + ':';
  if (minutes) time += pad(minutes) + ':';

  return time + pad(seconds);
};

class Track extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  onRemoveClick = (audioID) => this.props.remove(audioID, this.user.getId());

  onAddClick = (audioID) => this.props.add(audioID, this.user.getId());

  render() {
    const {className, size, artist, song, duration, id, url, canBeAdded, canBeRemoved} = this.props;
    const buttons = [];

    if (canBeAdded) {
      buttons.push(
        <Button
          className={b('btn', {add: true})}
          onClick={() => this.onAddClick(id)}
          size="s"
          view="plain"
          icon={<Icon name="add" size="s" light={true} style="blue"/>}
        />
      )
    }

    if (canBeRemoved) {
      buttons.push(
        <Button
          className={b('btn', {add: true})}
          onClick={() => this.onRemoveClick(id)}
          size="s"
          view="plain"
          icon={<Icon name="clear" size="s" light={true} style="blue"/>}
        />
      )
    }

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
              <a href={url} download={`${artist} - ${song}.mp3`}>
                <Button className={b('btn', {download: true})} size="s" view="plain" icon={<Icon name="file_download" size="s" light={true} style="blue"/>}/>
              </a>
            </span>
          </span>
        </span>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {add, remove}
)(Track);
