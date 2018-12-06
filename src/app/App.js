// Dependencies
import React, { Component } from 'react';
import firebase from 'firebase';
// Assets
// import logo from './assets/spiral_mycollection.svg';
import logo from './assets/camera-icon.png';
import icon_timeLine from './assets/outline-home-24px.svg';
import icon_search from './assets/outline-search-24px.svg';
import icon_userPerfil from './assets/outline-person_outline-24px.svg';
import icon_favorite_empty from './assets/baseline-favorite_border-24px.svg';
import icon_thumb_down_empty from './assets/outline-thumb_down-24px.svg';
import icon_thumb_up_empty from './assets/outline-thumb_up-24px.svg';
import icon_favorite_filled from './assets/baseline-favorite-24px.svg';
import icon_thumb_down_filled from './assets/baseline-thumb_down-24px.svg';
import icon_thumb_up_filled from './assets/baseline-thumb_up-24px.svg';

import './App.scss';
// App Components
import store from './shared/store';
import Fileupload from './Components/FileUpload';

class App extends Component {

  constructor () {
    super();
    this.state = {
      user: null,
      isLogged: false,
      pictures: [],
      like: []
    };

    store.subscribe( () => {
      this.setState({
        like: store.getState().like
      });
      console.log('y quedo el like en', store.getState().like)
    })
    this.addToLike = this.addToLike.bind(this);
    this.handleAuthLogin = this.handleAuthLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged( user => {
      // en ES6 si la clave y el valor se llaman igual se puede poner una vez
      // es por eso que en lugar de tener esto
      // user: user
      // solo esta esto
      // user
      this.setState({
        isLogged: ( user != null) ? true: false,
        user
      });
    });

    firebase.database().ref('images').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat( snapshot.val() )
      })
    })
  }

  handleAuthLogin () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then( result => {
        console.log(`${result.user} se aha logueado exitosamente!`);
      })
      .catch( error => console.log(`ERROR ${error.code}: ${error.message}`) );
  }

  handleLogout() {
    firebase.auth().signOut()
      .then( result => console.log(`${result.user.email} se aha logueado exitosamente!`))
      .catch( error => console.log(`ERROR ${error.code}: ${error.message}`) );
  }

  headerHandleButton () {
    if (this.state.isLogged) {
      let userNameToDisplay = `${this.state.user.displayName.split(' ').shift()} ${this.state.user.displayName.split(' ').pop()}`;
      return (
        <span>
          <div className="App-header-logged tooltip">
            <img className="App-user-avatar" src={this.state.user.photoURL} alt={userNameToDisplay} />
            <span className="tooltiptext">
              <p className="App-header-user-name">{userNameToDisplay}</p>
              <button className="tooltip-bottom" onClick={this.handleLogout}>Salir</button>
            </span>
          </div>
        </span>
      );
    } else {
      return (
        <button className="App-header-login-btn" onClick={this.handleAuthLogin}>Login</button>
      )
    }
  }

  renderLogInButton () {
    if (this.state.isLogged) {
      return (
        <div className="App-logged">

          {
            this.state.pictures.map( ( picture ) => {
              return (
                <article className="App-article">
                  <header className="App-articleHeader">
                    <img src={picture.photoURL} alt={picture.displayName} />
                    <span>{picture.displayName}</span>
                  </header>
                  <section className="App-article-content">
                    <div className="App-article-imageContainer">
                      <img src={picture.image} alt=""/>
                    </div>
                    <div className="App-article-dataContainer">
                      <h4 className="App-article-tematicalTag">
                        <span className="App-article-tematicalTag_title">
                          #downTurnForWhat
                        </span>
                        <span className="App-article-tematicalTag_actions">
                          <span onClick={() => this.addToLike('pepe')} alt='like'>
                            <img src={icon_thumb_up_filled} className="App-icon_thumb_up_filled" alt="icon_thumb_up_filled" />
                          </span>
                          <span onClick={() => this.addToLike('unLike')} alt='unlike'>
                            <img src={icon_thumb_down_empty} className="App-icon_thumb_down_filled" alt="icon_thumb_down_filled" />
                          </span>
                          <span>
                            <img src={icon_favorite_filled} className="App-icon_favorite" alt="icon_favorite" />
                          </span>
                        </span>
                      </h4>
                      <p className="App-article-text">nana na na na</p>
                      <div className="App-article-extraTags">#hola #mundo #etc</div>
                      <section className="App-article-coments">hola turros</section>
                    </div>
                  </section>
                </article>
              )
            }).reverse()
          }
        </div>
      );
    }
  }

  handleUpload ( event ) {
    const file = event.target.files[0];
    const userFolderImages = this.state.user.displayName.toLocaleLowerCase().replace(/ /g, '-');
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
          photoURL: this.state.user.photoURL,
          displayName:this.state.user.displayName,
          image: downloadURL
        };

        const dbRef = firebase.database().ref('images');
        const newPicture = dbRef.push();
        newPicture.set(record);

      });
    });
  }

  addToLike(product){
    store.dispatch({
      type: 'ADD_TO_LIKE',
      product
    })
  }

  filterHashTagsFromPlainText (inputText) {
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }

    return matches;
  }

  render() {
    return (
      <section className="App">
        <header className="App-header">
          <span>
            <img src={logo} className="App-logo" alt="logo" />
            <span className="App-logo-brand">
              myCollection
            </span>
          </span>
          <span>
            { this.headerHandleButton() }
          </span>
        </header>

        <main className="App-main">
          { this.renderLogInButton() }
        </main>

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
      </section>
    );
  }
}

export default App;
