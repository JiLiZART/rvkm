import React from 'react';
import block from 'bem-cn';
import './index.styl';

import Icon from 'components/Icon';

const b = block('play-button');

const PlayButton = ({className, playing, size, ...args}) => (
  <span className={b({size}).mix(className)} {...args}>
    <Icon name={playing ? 'pause' : 'play_arrow'} style="white" size={size} />
  </span>
);

export default PlayButton;
