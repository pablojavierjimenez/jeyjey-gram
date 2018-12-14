// Dependencies
import React, { Component } from 'react';
import firebase from 'firebase';

// Assets
import icon_timeLine from '../../assets/outline-home-24px.svg';
import icon_search from '../../assets/outline-search-24px.svg';
import icon_userPerfil from '../../assets/outline-person_outline-24px.svg';
import icon_favorite_empty from '../../assets/baseline-favorite_border-24px.svg';

import './Footer.scss';

// App Components
import Fileupload from '../FileUpload';



class Footer extends Component {

  constructor () {
    super();
    this.state = {
      someValue: 0
    };

  }

  handleUpload ( event ) {
    const file = event.target.files[0];
    const userFolderImages = this.props.userStateData.displayName.toLocaleLowerCase().replace(/ /g, '-');
    const storageRef = firebase.storage().ref(`/images/${userFolderImages}/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', ( snapshot ) => {
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

        const record = {
          photoURL: this.props.userStateData.photoURL,
          displayName:this.props.userStateData.displayName,
          image: downloadURL
        };

        const dbRef = firebase.database().ref('images');
        const newPicture = dbRef.push();
        newPicture.set(record);

      });
    });
  }

  render () {
    return (
      <footer className="App-footer">
        <span className="App-footerIcons">
          <img src={icon_timeLine} className="App-icon_timeLine" alt="icon_timeLine" />
        </span>
        <span className="App-footerIcons">
          <img src={icon_search} className="App-icon_search" alt="icon_search" />
        </span>
        <span className="App-footerIcons App-fileUpload_container">
          <Fileupload onUpload={ this.handleUpload }/>
        </span>
        <span className="App-footerIcons">
          <img src={icon_favorite_empty} className="App-icon_favorite_empty" alt="icon_favorite_empty" />
        </span>
        <span className="App-footerIcons">
          <img src={icon_userPerfil} className="App-icon_userPerfil" alt="logo" />
        </span>
      </footer>
    )
  }
}

export default Footer;

