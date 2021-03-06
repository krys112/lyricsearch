import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context';

const Search = () => {
  const [state, setState] = useContext(Context);
  const [userInput, setUserInput] = useState("");
  const [inputAction, setInputAction] = useState("tracks");
  const [trackTitle, setTrackTitle] = useState("");

  useEffect(() => {
    if (inputAction === 'tracks') {
      axios
        .get(
          `http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
          }`
        )
        .then(res => {
          let track_list = res.data.message.body.track_list;
          setState({ track_list: track_list, heading: "Search Results" });
        })
        .catch(err => console.log(err));
    } else if (inputAction === 'users') {
      axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${trackTitle}&limit=9&api_key=${process.env.REACT_APP_LFM_KEY}&format=json
        `
      )
        .then(res => {
          let track_list = res.data.recenttracks.track;
          setState({ track_list: track_list, heading: "User's Recent Tracks" });
        })
        .catch(err => console.log(err));
    }
  }, [trackTitle]);

  const findTrack = e => {
    e.preventDefault();
    setTrackTitle(userInput);
    setUserInput('');
  };

  const onChange = e => {
    setUserInput(e.target.value);
  };

  const selectChange = e => {
    setInputAction(e.target.value);
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={findTrack}>
        <div className="input-group form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title..."
            name="userInput"
            value={userInput}
            onChange={onChange}
          />
          <div className="input-group-append">
            <select
              action={inputAction}
              className="btn btn-outline-secondary"
              onChange={selectChange}
              name="action"
            >
              <option value="tracks" className="bg-light text-dark">Search Tracks</option>
              <option value="users" className="bg-light text-dark">Search User</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-primary btn-lg btn-block mb-5"
          type="submit"
        >
          Get Tracks
        </button>

      </form>
    </div>
  );
};

export default Search;
