import React, {Component} from 'react';

class Base extends Component {
  COUNT = 100;

  state = {audiosOffset: 0};

  componentDidMount() {
    this.fetchItems().then(() => this.fetchAudios());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      this.fetchAudios();
    }
  }

  onMoreClick = (audios) => () => {
    const {audiosOffset} = this.state;

    console.log('more click');

    this.fetchAudios(audiosOffset + this.COUNT).then(() => {
      console.log('more load');
    });
  };
}

export default Base;
