import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import Icon from 'components/Icon';

const popup = block('popup');

class Popup extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: Boolean(props.visible)
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      visible: newProps.visible
    });
  }

  onCloseClick = () => {
    this.setState({visible: false});
  }

  render() {
    const {children, title} = this.props;
    const {visible} = this.state;

    return (
      <div className={popup({visible: Boolean(visible)})}>
        <div className={popup('header')}>
          <div className={popup('close')} onClick={this.onCloseClick}><Icon name="close" size="s"/></div>
          <div className={popup('title')}>{title}</div>
        </div>
        <div className={popup('body')}>{children}</div>
      </div>
    );
  }
}

export default Popup;
