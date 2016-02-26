import React from 'react';
import _ from 'lodash';
import config from '../config/default';


const artworkDefault = 'http://ingridwu.dmmdmcfatter.com/wp-content/uploads/2015/01/placeholder.png';


export default class TrackCell extends React.Component {
  constructor(props) {
    super(props);

    _.extend(this, {
      state: {
        playing: false,
        loaded: false,
        error: false
      },
      play: this.play.bind(this),
      pause: this.pause.bind(this)
    });
  }

  componentDidMount() {
    this.audio = new Audio(`${this.props.track.stream_url}?client_id=${config.soundcloud.key}`);
    this.audio.addEventListener('error', () => this.setState({ error: true }) );
    this.audio.addEventListener('canplaythrough', () => this.setState({ loaded: true }) );
  }

  componentWillUnmount() {
    this.audio.removeEventListener('error');
    this.audio.removeEventListener('canplaythrough');
  }

  play() {
    this.setState({ playing: true });
    this.audio.play();
  }

  pause() {
    this.setState({ playing: false });
    this.audio.pause();
  }


  render() {
    let {user, title, description, artwork_url, permalink_url, downloadable, download_url, waveform_url} = this.props.track;

    return (
      <div className='track' style={{backgroundImage: `url(${waveform_url})`}}>
        <div className='track-image' style={ {backgroundImage: `url(${artwork_url || artworkDefault})`} } />

        <div className='track-information'>
          <h4 className='track-title'>
            <a href={permalink_url} target='_blank'>{title}</a>
          </h4>

          <span className="track-artist">{user.username}</span>

          <p className='track-description'>{description || 'No description provided'}</p>

          <div className='track-actions'>
            {(() => {
              if (this.state.error) {
                return (<i className='ion ion-alert-circled' />)
              } else if (!this.state.loaded) {
                return (<i className='ion ion-load-d spin' />)
              } else if (this.state.playing) {
                return (<i onClick={this.pause} className='ion ion-pause' />)
              } else {
                return (<i onClick={this.play} className='ion ion-play' />)
              }
            })()}

            {downloadable && <a className='ion ion-android-download' href={`${download_url}?client_id=${config.soundcloud.key}`} download></a>}
          </div>
        </div>
      </div>
    )
  }
}
