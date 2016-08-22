import React, {PropTypes} from 'react';
import block from 'bem-cn';
import './index.styl';

const spinner = block('spinner');

const Spinner = ({type, size}) => (
  <div className={spinner({type: type || 'default', size})}>
    <span className={spinner('dot', {first: true})}/>
    <span className={spinner('dot', {second: true})}/>
    <span className={spinner('dot', {third: true})}/>
  </div>
);

export default Spinner;
