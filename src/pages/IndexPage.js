import React, { Component } from 'react';
import { App } from 'components';

const styles = require('styles/music.styl');

export default class IndexPage extends Component {
  render() {
    const { audioContext } = this.props.route;

    console.log('route', this.props);

    return (<App audioContext={audioContext} />);
  }
}


