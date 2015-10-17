import React, { Component } from 'react';
import { App } from 'components';

const styles = require('styles/music.styl');

export default class AlbumPage extends Component {
  render() {
    const { audioContext } = this.props.route;

    return (<App audioContext={audioContext} />);
  }
}
