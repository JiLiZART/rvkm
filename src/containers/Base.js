import React, {Component} from 'react';

class Base extends Component {
  COUNT = 100;

  constructor(props, context) {
    super(props, context);

    this.state = {audiosOffset: 0};
  }

  componentDidMount() {
    this.fetchItems().then(() => this.fetchAudios());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      this.fetchAudios();
    }
  }

  onMoreClick = (done) => {
    const {audiosOffset} = this.state;

    this.fetchAudios(audiosOffset + this.COUNT).then(() => done());
  };
}

export default Base;
