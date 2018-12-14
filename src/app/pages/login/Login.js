// Dependencies
import React, { Component } from 'react';
import { Link }  from 'react-router';
import firebase from 'firebase';

//Assets
import './Login.scss';

// App Components
import store from '../../shared/store';

export default class Login extends Component {

  constructor () {
    super();
    this.state = {
      userData: store.getState().userData || null,
      isUserLogged: false
    };

    store.subscribe( () => {
      this.setState({
        userData: store.getState().userData,
        isUserLogged: store.getState().isUserLogged
      });
      //console.log('STORE is Logged', store.getState().isUserLogged );
      //console.log('STATE is Logged', this.state.isUserLogged );
    });

    //BIND METHODS
    this.renderLogInButton = this.renderLogInButton.bind(this);
  }

  renderLogInButton(){

    if ( this.state.isUserLogged ){
      return (
        <span>
          <h1 className="App-Login">aca pegas un re contenido</h1>
          <p>igual aca al loguearte tendria que redireccionarte automaticamente a la home o / </p>
        </span>
      );
    } else {
      return (
        <span>
          <h1 className="App-Login">no estas logueado te tenes que loguear</h1>
          <p>si entramos a home sin estar logueados nos tendria que traer a esta vista</p>
        </span>
      );
    }
  }

  render() {
    return (
      <main className="App-main">
        { this.renderLogInButton() }
      </main>
    )
  }
}
