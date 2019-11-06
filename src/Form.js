import React, { Component, Fragment } from 'react';
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
      <Fragment>
        { !this.state.loading &&
          <div>
            <label>Enter your graduation year</label>
            <input type="text" onChange={this.handleChange} value={this.state.year} />
            <input type="submit" onClick={this.submit} onSubmit={this.submit} />
          </div>
        }
        { this.state.loading  && 'One moment please' }
        { this.state.error && this.state.error }
        { !this.state.error &&
          <ul>
            { this.state.songs.map((song, i) => <li key={i}>{song.title} by {song.artist}</li>) }
          </ul>
        }
      </Fragment>
    )
  }
}

export default Form
