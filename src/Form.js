import React, { Component } from 'react';
import './Form.css';
import axios from 'axios';

const SONG_URL = `/api/songs`

class Form extends Component {
  constructor(props) {
    super(props);
    this.fetchSongs = this.debounce(this.makeApiRequest, this);
  }

  state = {
    year: "",
    songs: [],
    error: null,
    loading: false
  }

  handleChange = (e) => {
    this.setState({year: e.target.value});
  }

  submit = () => {
    this.setState({ loading: true, songs: [], error: null });
    this.fetchSongs(this.state.year);
  }

  makeApiRequest = (year) => {
    axios.get(`${SONG_URL}/${year}`)
      .then((resp) => {
        this.setState({
          songs: resp.data.songs,
          error: null,
          loading: false
        });
      })
      .catch((_err) => {
        this.setState({
          songs: [],
          error: 'Whoops. Something went wrong. Try again in a few minutes.',
          loading: false
        });
      });
  }

  debounce = (func, context) => {
    let lastTimeCalled = null;
    return function(args) {
      const tenSeconds = 10 * 1000;
      if (lastTimeCalled && (Date.now() - lastTimeCalled > tenSeconds)) {
        lastTimeCalled = Date.now();
        func.call(context, args);
      } else if (!lastTimeCalled) {
        lastTimeCalled = Date.now();
        func.call(context, args);
      } else {
        // no-op
      }
    }
  }

  render() {
    return(
      <div className="Form">
        <div className="Form-inputs">
          <p>Enter your graduation year to get a customized karaoke playlist</p>
          <input type="text" onChange={this.handleChange} value={this.state.year} />
          <input type="submit" onClick={this.submit} onSubmit={this.submit} />
        </div>
        <div className="Form-results">
          { this.state.loading  && 'One moment please' }
          { this.state.error && this.state.error }
          { !this.state.error &&
            <div className="Form-table">
              { this.state.songs.map((song, i) => <div key={i}>{song.title} by {song.artist}</div>) }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Form
