import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import Spinner from 'components/Spinner';
import Button from 'components/Button';

const b = block('pagination-more');

class PaginationMore extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    const {infinite} = this.props;

    this._lastScrollTop = null;

    if (infinite) {
      window.addEventListener('scroll', this.checkPosition);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkPosition);
  }

  checkPosition = () => {
    const elOffsetTop = this._el.offsetTop;
    const wOffsetTop = window.pageYOffset;
    const postDiff = wOffsetTop - elOffsetTop;

    if (wOffsetTop == this._lastScrollTop) {
      return;
    }

    if (wOffsetTop > elOffsetTop) {
      console.log('pagination hit');
    }

    console.log('postDiff', postDiff);

    this._lastScrollTop = wOffsetTop;

    console.log('this._el', this._el);
  };

  onMoreClick = () => {
    const {onLoad} = this.props;

    onLoad();
  };

  render() {
    const {loading} = this.state;
    let button;

    if (loading) {
      button = (<Spinner size="lg" type="primary"/>);
    } else {
      button = (<Button size="l" onClick={this.onMoreClick}>Показать еще</Button>)
    }

    return (
      <section className={b} ref={(el) => this._el = el}>
        <div className={b('loading')}>{button}</div>
      </section>
    );
  }
}


export default PaginationMore
