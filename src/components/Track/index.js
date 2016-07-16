import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import Icon from 'components/Icon';
import Button from 'components/Button';

import User from 'models/User';

import {connect} from 'react-redux';
import {add, remove} from 'actions/audios';

const track = block('track');

const mapStateToProps = (state) => {
  return {
    player: state.player,
    user: new User(state.user)
  };
};

class Track extends Component {

  onDownloadClick = () => window.open(this.props.url);

  onRemoveClick = (audioID) => this.props.remove(audioID, this.user.getId());

  onAddClick = (audioID) => this.props.add(audioID, this.user.getId());

  render() {
    const {className, size, artist, song, duration, id, url} = this.props;

    return (
      <div className={track({size}).mix(className)}>
      <span className={track('content')}>
        <span className={track('left')}>
          <span className={track('artist')}>{artist}</span><span className={track('divider')}>&nbsp;&mdash;&nbsp;</span><span className={track('song')}>{song}</span>
        </span>
        <span className={track('right')}>
          <span className={track('duration')}>{duration}</span>
          <span className={track('controls')}>
            <Button className={track('btn', {remove: true})}
              onClick={() => this.onRemoveClick(id)} size="s" view="plain" icon={<Icon name="clear" size="s" style="light" />}/>
            <Button className={track('btn', {add: true})}
              onClick={() => this.onAddClick(id)} size="s" view="plain" icon={<Icon name="add" size="s" style="light" />}/>
              <a href={url} download={`${artist} - ${song}.mp3`}>
                <Button className={track('btn', {download: true})} size="s" view="plain" icon={<Icon name="file_download" size="s" style="light" />}/>
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