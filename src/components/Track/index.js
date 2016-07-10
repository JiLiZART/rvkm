import React from 'react';
import block from 'bem-cn';
import './index.styl';

const track = block('track');

const Track = ({className, size, artist, song, duration}) => (
  <div className={track({size}).mix(className)}>
    <span className={track('content')}>
      <span className={track('left')}>
        <span className={track('artist')}>{artist}</span><span className={track('divider')}>&nbsp;&mdash;&nbsp;</span><span className={track('song')}>{song}</span>
      </span>
      <span className={track('right')}>
        <span className={track('duration')}>{duration}</span>
      </span>
    </span>
  </div>
);

export default Track;
