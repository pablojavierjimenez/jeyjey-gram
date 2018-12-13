// Dependencies
import React, { Component } from 'react';
import { Link }  from 'react-router';
import firebase from 'firebase';
// Assets
import logo from './assets/spiral_mycollection.svg';
import './App.scss';
// App Components
import store from './shared/store';
import Fileupload from './Components/FileUpload';
import { timingSafeEqual } from 'crypto';

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
      return (
        <span>
          <div className="App-header-logged">
            <img className="App-user-avatar" src={this.state.user.photoURL} alt={this.state.user.displayName} />
            <button onClick={this.handleLogout}>Salir</button>
          </div>
          <p className="App-header-user-name">{this.state.user.displayName.split(' ').shift()}</p>
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
          <Fileupload onUpload={ this.handleUpload }/>
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
                        <span>#downTurnForWhat</span>
                        <span onClick={() => this.addToLike('pepe')} alt='like'>👍</span>
                        <span onClick={() => this.addToLike('unLike')} alt='unlike'>👎</span>
                        <span>❤️</span>
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
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Jey Jey Gram
            <Link to="/">Home</Link>
            <Link to="/user">User</Link>
          </p>
          { this.headerHandleButton() }
        </header>

        <main className="App-main">
          { this.props.children }
          { this.renderLogInButton() }
        </main>

        <footer className="App-footer">
        <p>
          si un link quieres encontrar
          a mi debes consultar
          soy el footer... soy el futer soy el footer soy el FOOTER!!!
          <div className="icon_credits">
            Icons made by
            <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
          </div>
        </p>
        </footer>
      </section>
    );
  }
}

export default App;
