import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor () {
    super();
    this.state = {
      user: null
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

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
    })
  })
}

  /**
   *
   */
  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then( result => {
        console.log(`${result.user} se aha logueado exitosamente!`)
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
        </div>
      );
    } else {
      return (
        <button onClick={this.handleAuth}>Login con Google</button>
      )
    }
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
        </p>
        </footer>
      </section>
    );
  }
}

export default App;
