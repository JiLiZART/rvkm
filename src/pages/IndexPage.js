import React, { Component } from 'react';
// import { Link } from 'react-router';
import { App } from 'components/Music';

const styles = require('styles/music.styl');

export default class IndexPage extends Component {

  componentWillMount() {
    // styles.use();
  }

  componentWillUnmount() {
    // styles.unuse();
  }

  render() {
    return (<App />);
  }
}


