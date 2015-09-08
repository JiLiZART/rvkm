import React, { Component } from 'react';
import { App } from 'components/Music';

// const styles = require('style/useable!css!todomvc-app-css/index.css');
export default class AlbumPage extends Component {

  componentWillMount() {
    // styles.use();
  }

  componentWillUnmount() {
    // styles.unuse();
  }

  render() {
    return (
      <div>
        <App />
      </div>
    );
  }
}
