import React, { Component } from 'react';

import styles from 'styles/blocks/info.styl';

export default class Info extends Component {

  render() {
    const { player } = this.props;
    const artist = player.getIn(['file', 'artist'], '');
    const title = player.getIn(['file', 'title'], '');

    return (
      <div className={styles.info}>
        <div className={styles.info__left}>
          <i className="fa fa-random"></i>
          <i className="fa fa-heart"></i>
        </div>
        <div className={styles.info__center}>
          <div className={styles.info__current}>
            <span className={styles.info__title}>{title}</span>
            <span className={styles.info__artist}>{artist}</span>
          </div>
        </div>
        <div className={styles.info__right}>
          <i className="fa fa-repeat"></i>
          <i className="fa fa-share"></i>
        </div>
      </div>
    );
  }
}
