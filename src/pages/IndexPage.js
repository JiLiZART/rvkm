import React, { Component } from 'react';
import { App } from 'components';

export default class IndexPage extends Component {
  render() {
    const { audioContext } = this.props.route;

    return (<App audioContext={audioContext} />);
  }
}


