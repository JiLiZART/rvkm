import React from 'react';
import block from 'bem-cn';
import './index.styl';

const error = block('error');

const Error = ({title, desc, className}) => (
  <div className={error.mix(className)}>
    <div className={error('title')}>{title}</div>
    <div className={error('desc')}>{desc}</div>
  </div>
);

export default Error;
