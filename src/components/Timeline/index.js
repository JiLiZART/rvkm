import React, {Component} from 'react';
import block from 'bem-cn';
import './index.styl';

import AudioPlayer from 'models/AudioPlayer';

const mapStateToProps = (state) => {
  return {
    player: state.player
  };
};

const timeline = block('timeline');

class Timeline extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      seek: 0,
      buffer: 0,
      progress: 0
    };
  }

  componentDidMount() {
    AudioPlayer.on('progress', (e) => {
      this.setState(AudioPlayer.getInfo());
      //dispatch(progress(AudioPlayer.getInfo()));
    });
  }

  render() {
    const {seek, buffer, progress} = this.state;

    return (
      <div className={timeline({seek: Boolean(seek)})} ref="timeline">
        <div className={timeline('trail')} ref="trail">
          <div className={timeline('buffer')} style={{width: buffer + '%'}}></div>
          <div className={timeline('seek')} ref="seek" style={{width: seek + '%'}}></div>
          <div className={timeline('progress')} style={{width: progress + '%'}}></div>
        </div>
      </div>
    );
  }
}

export default Timeline;
