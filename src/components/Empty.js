import React, { Component } from 'react';

export default class Cover extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="empty">
          <div className="empty__icon">
            <i className="glyphicon glyphicon-remove-circle"></i>
          </div>
          <div className="empty__message">
            {children}
          </div>
        </div>
    );
  }
}
