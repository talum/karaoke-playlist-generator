import React, { Component } from 'react';
import './Form.css';
import axios from 'axios';

const SONG_URL = `/api/songs`

class Form extends Component {
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
    axios.get(`${SONG_URL}/${this.state.year}`)
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

  render() {
    return(
      <div className="Form">
        { !this.state.loading &&
          <div className="Form-inputs">
            <p>Enter your graduation year to get a customized karaoke playlist</p>
            <input type="text" onChange={this.handleChange} value={this.state.year} />
            <input type="submit" onClick={this.submit} onSubmit={this.submit} />
          </div>
        }
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
