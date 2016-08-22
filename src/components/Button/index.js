import React from 'react';
import block from 'bem-cn';
import './index.styl';

const button = block('button');

const Button = ({icon, size, view, type, disabled, className, children, ...props}) => (
  <button className={button({size, view, type, disabled: Boolean(disabled)}).mix(className)} {...props}>
    {icon}
    {children ? <span className={button('text')}>{children}</span> : null}
  </button>
);

export default Button;
