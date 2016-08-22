import React from 'react';
import block from 'bem-cn';
import './index.styl';

const avatar = block('avatar');

const Avatar = ({className, src, alt, size}) => (
  <span className={avatar({size}).mix(className)}>
    <img className={avatar('image')} src={src} alt={alt} />
  </span>
);

export default Avatar;
