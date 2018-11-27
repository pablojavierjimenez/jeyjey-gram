import React, { Component } from 'react';
import firebase from 'firebase';
// import FileUpload from 'FileUpload ';
import logo from './logo.svg';
import './App.css';
import Fileupload from './FileUpload';

class App extends Component {

  constructor () {
    super();
    this.state = {
      user: null,
      pictures: []
    };

    this.handleAuth = this.handleAuth.bind(this);
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
        user
      });
    });

    firebase.database().ref('images').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat( snapshot.val() )
      })
    })
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then( result => {
        console.log(`${result.user} se aha logueado exitosamente!`);
        debugger;
      })
      .catch( error => console.log(`ERROR ${error.code}: ${error.message}`) );
  }

  handleLogout() {
    firebase.auth().signOut()
      .then( result => console.log(`${result.user.email} se aha logueado exitosamente!`))
      .catch( error => console.log(`ERROR ${error.code}: ${error.message}`) );
  }

  renderLogInButton () {
    if (this.state.user) {
      return (
        <div className="App-logged">
          <img className="App-user-avatar" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}!</p>
          <button onClick={this.handleLogout}>Salir</button>
          <Fileupload onUpload={ this.handleUpload }/>
          {
            this.state.pictures.map( ( picture ) => {
              console.log(picture)
              return (
                <div>
                  <img width="320" src={picture.image} alt=""/>
                  <br/>
                  <img width="320" src={picture.photoURL} alt={picture.displayName} />
                  <br/>
                  <span>{picture.displayName}</span>
                </div>
              )
            }).reverse()
          }
        </div>
      );
    } else {
      return (
        <button onClick={this.handleAuth}>Login con Google</button>
      )
    }
  }

  handleUpload ( event ) {
    const file = event.target.files[0];
    const userFolderImages = this.state.user.displayName.toLocaleLowerCase().replace(/ /g, '-');
    console.log('userName', userFolderImages);
    const storageRef = firebase.storage().ref(`/images/${userFolderImages}/${file.name}`);
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

        const record = {
          photoURL: this.state.user.photoURL,
          displayName:this.state.user.displayName,
          image: downloadURL
        };

        firebase.database().ref('images').set({
          photoURL: this.state.user.photoURL,
          displayName:this.state.user.displayName,
          image: downloadURL
        });
        console.log(record);

        const dbRef = firebase.database().ref('images');
        const newPicture = dbRef.push();
        newPicture.set(record);

      });
    });
  }



  render() {
    return (
      <section className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <main className="App-main">
          <h1>hola putos!</h1>
          { this.renderLogInButton() }
        </main>

        <footer className="App-footer">
        <p>
          si un link quieres encontrar
          a mi debes consultar
          soy el footer... soy el futer soy el footer soy el FOOTER!!!
          <div>
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
