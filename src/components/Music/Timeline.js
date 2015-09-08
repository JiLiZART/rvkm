import React, { Component } from 'react';
import moment from 'moment';
import momentDuration from 'moment-duration-format';

export default class Timeline extends Component {

  componentDidMount() {
    this.trailWidth = window.outerWidth;

    let trail = React.findDOMNode(this.refs.trail);
    let seek = React.findDOMNode(this.refs.seek);

    window.onresize = () => {
      this.trailWidth = trail.offsetWidth;
    };

    trail.addEventListener('click', this.handleTrailClick.bind(this, trail))
  }

  handleTrailClick(trailNode, e) {
    console.log('handleSeekClick', e);
    console.dir(trailNode);
  }

  render() {
    const { player } = this.props;
    const current = player.get('current');
    const playing = current.get('playing', false);
    const time = current.get('time');
    const duration = current.get('duration', 0);

    const file = current.get('file');
    const artist = file.get('artist');
    const title = file.get('title');

    let progress = 0;

    if (time) {
      progress = ((duration - time) / duration) * 100
    }

    const durationFormated = moment.duration(duration, "minutes").format();
    const timeFormated = moment.duration(time, "minutes").format();

    let info = (
      <div className="music__timeline-info" style={{width: this.trailWidth + 'px'}}>
        <div className="music__timeline-time">{timeFormated}</div>
        <div className="music__timeline-length">{durationFormated}</div>
        <div className="music__timeline-title">{artist} &mdash; {title}</div>
      </div>
    );

    return (
      <div className="music__timeline" style={{display: artist && title ? 'block':'none'}}>
        <div className="music__timeline-trail" ref="trail">
          <div className="music__timeline-buffer" style={{width: '60.1194%'}}></div>
          <div className="music__timeline-seek" ref="seek" style={{width: '20.1194%'}}></div>
          {info}
          <div className="music__timeline-progress" style={{width: progress + '%'}}>
            {info}
          </div>
        </div>
        <div className="music__timeline-actions"></div>
      </div>
    );
  }
}
