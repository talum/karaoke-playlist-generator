import React, { Component, Fragment } from 'react'

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
    // do some stuff
  }

  render() {
    return(
      <Fragment>
        <label>Enter your graduation year</label>
        <input type="text" onChange={this.handleChange} value={this.state.year} />
        <input type="submit" onSubmit={this.submit} />
      </Fragment>
    )
  }
}

export default Form
