import React from 'react';
import block from 'bem-cn';
import './index.styl';

import Icon from 'components/Icon';
import Spinner from 'components/Spinner';

const b = block('play-button');

const PlayButton = ({className, playing, size, loading, ...args}) => (
  <span className={b({size}).mix(className)} {...args}>
    {loading ? (<Spinner size={size} type="inverted" />) : (<Icon name={playing ? 'pause' : 'play_arrow'} style="white" size={size}/>)}
  </span>
);

export default PlayButton;
