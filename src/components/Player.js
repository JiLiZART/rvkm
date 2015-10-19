import React, { Component } from 'react';

import styles from 'styles/blocks/player.styl';

export default class Player extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.player} ref="player">{children}</div>
    );
  }
}
