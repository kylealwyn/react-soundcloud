import React from 'react';
import request from '../utils/request';
import config from '../config/default';
import TrackCell from './TrackCell';
import _ from 'lodash';

const SoundcloudAPI = `https://api.soundcloud.com/tracks?client_id=${config.soundcloud.key}&limit=${config.soundcloud.limit}`

export default class TrackList extends React.Component {
  constructor(props) {
    super(props);
    _.extend(this, {
      state: {},
      fetchTracks: this.fetchTracks.bind(this)
    });
  }

  componentDidMount() {
    this.fetchTracks();
  }

  componentWillUnmount() {
    this.request.abort();
  }

  fetchTracks() {
    request('get', SoundcloudAPI.replace('{{limit}}', '10')).then((results) => {
      this.setState({tracks: results.body});
    }).catch(() => {
      // console.log(err);
    });
  }

  render() {
    if (!this.state.tracks) {
      return (<h1>Loading Tracks...</h1>)
    }

    return (
      <div>
        <div className="container">
          {this.state.tracks.map((track, idx) => {
            return (
              <TrackCell key={idx} track={track} />
            )
          })}
        </div>
      </div>
    )
  }
}
