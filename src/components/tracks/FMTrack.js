import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const FMTrack = (props) => {
  const { track } = props;

  const onClick = e => {
    axios.get(`http://api.musixmatch.com/ws/1.1/track.search?q_artist=${track.artist["#text"]}&q_track=${track.name}&page_size=1&page=1&s_track_rating=desc&apikey=${
      process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        const track_id = res.data.message.body.track_list[0].track.track_id;
        props.history.push(`lyrics/track/${track_id}`);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artist["#text"]}</h5>
          <p className="card-text">
            <strong><i className="fas fa-play"></i> Track</strong>: {track.name}
            <br />
            <strong><i className="fas fa-compact-disc"></i> Album</strong>: {track.album["#text"]}
          </p>
          <button
            onClick={onClick}
            className="btn btn-dark btn-block"
          >
            <i className="fas fa-chevron-right"></i> View Lyrics
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(FMTrack);