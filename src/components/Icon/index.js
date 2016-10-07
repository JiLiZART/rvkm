import React from 'react';
import block from 'bem-cn';
import './index.styl';

const icon = block('icon');

const Icon = ({className, name, size, style, light}) => (
  <span className={icon({name, size, style, light}).mix(className)} />
);

export default Icon;
