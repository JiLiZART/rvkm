import React, { Component } from 'react';

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

