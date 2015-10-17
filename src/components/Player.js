import React, { Component } from 'react';

export default class Player extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="player" ref="player">
        { children }
      </div>
    );
  }
}
