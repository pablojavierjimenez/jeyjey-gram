import React, { Component } from 'react';

class Fileupload extends Component {
  constructor () {
    super();
    this.state = {
      uploadValue: 0
    }
  }

  render () {
    return (
      <div>
        <progress value={ this.state.uploadValue }></progress>
        <br/>
        <input type="file" onChange={ this.props.onUpload }/>
      </div>
    )
  }
}

export default Fileupload;
