// Dependencies
import React, { Component } from 'react';
import { Link }  from 'react-router';
import firebase from 'firebase';

//Assets
import logo from '../../assets/camera-icon.png';
import './Header.scss';

// App Components
import store from '../../shared/store';

export default class Header extends Component {

  constructor () {
    super();
    this.state = {
      user: store.getState().userData || null
    };

    store.subscribe( () => {
      this.setState({
        userData: store.getState().userData
      });
      console.log('esto es el header', this.state.user.displayName );
    })
  }

  render() {
    return (
      <header className="App-header">
        <span>
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-logo-brand">
            myCollection
            <Link to="/">Home</Link>
            <Link to="/user">User</Link>
          </span>
        </span>
        <span>
           this.headerHandleButton()
        </span>
      </header>
    )
  }
}
