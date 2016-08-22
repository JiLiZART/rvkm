import React from 'react';
import block from 'bem-cn';
import './index.styl';

const icon = block('icon');

const Icon = ({className, name, size, style}) => (
  <span className={icon({name, size, style}).mix(className)} />
);

export default Icon;
