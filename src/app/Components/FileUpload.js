import React, { Component } from 'react';
import icon_addImage from '../assets/outline-control_point-24px.svg';
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
        <label htmlFor="file">
          <img src={icon_addImage} className="App-icon_addImage" alt="logo" />
          <input className="App-fileUpload_upload__input" id="file" type="file" onChange={ this.props.onUpload }/>
        </label>
      </div>
    )
  }
}

export default Fileupload;
