import React, { Component, PropTypes } from 'react';
import GeminiScrollbar from 'react-gemini-scrollbar';
import Immutable from 'immutable';

export default class Scrollable extends Component {
  render() {
    const { children } = this.props;

    return (
      <section className="scrollable">
        {children}
      </section>
    );
  }
}

