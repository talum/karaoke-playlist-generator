import React, { Component, Fragment } from 'react';
import axios from 'axios';

const SONG_URL = `/api/songs`

class Form extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    year: ""
  }

  handleChange = (e) => {
    this.setState({year: e.target.value});
  }

  submit = () => {
    axios.get(SONG_URL).
      then((resp) => {
        console.log(resp.data.songs);
      })
    // do some stuff
  }

  render() {
    return(
      <Fragment>
        <label>Enter your graduation year</label>
        <input type="text" onChange={this.handleChange} value={this.state.year} />
        <input type="submit" onClick={this.submit} onSubmit={this.submit} />
      </Fragment>
    )
  }
}

export default Form
