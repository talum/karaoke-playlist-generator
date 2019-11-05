import React, { Component, Fragment } from 'react';
import axios from 'axios';

const SONG_URL = `/api/songs`

class Form extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    year: "",
    songs: []
  }

  handleChange = (e) => {
    this.setState({year: e.target.value});
  }

  submit = () => {
    axios.get(`${SONG_URL}/${this.state.year}`).
      then((resp) => {
        console.log(resp.data.songs);
        this.setState({songs: resp.data.songs});
      })
  }

  render() {
    return(
      <Fragment>
        <label>Enter your graduation year</label>
        <input type="text" onChange={this.handleChange} value={this.state.year} />
        <input type="submit" onClick={this.submit} onSubmit={this.submit} />
        <ul>
          { this.state.songs.map((song, i) => <li key={i}>{song.title} by {song.artist}</li>) }
        </ul>
      </Fragment>
    )
  }
}

export default Form
