import React, { Component } from 'react';
import firebase from 'firebase';

class Fileupload extends Component {
  constructor () {
    super();
    this.state = {
      uploadValue: 0,
      picture: null
    }

    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload ( event ) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/images/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', ( snapshot ) => {
      console.log('snaptshot');
      let porcentage = ( snapshot.bytestTransferred / snapshot.totalBytes ) * 100;
      this.setState({
        uploadValue: porcentage
      });
    }, error => {
      console.log('error');
      console.log(error.message);
    }, () => {
      console.log('on Complete');
      uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL) => {
        this.setState({
          uploadValue: 100,
          picture: downloadURL
        });
      });
    });
  }


  render () {
    return (
      <div>
        <progress value={ this.state.uploadValue }></progress>
        <br/>
        <input type="file" onChange={ this.handleUpload }/>
        <br/>
        <img width="320" src={this.state.picture} alt=""/>
      </div>
    )
  }
}

export default Fileupload;
