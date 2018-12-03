// Globals
import React, { Component } from 'react';
// Components

// Assets
import logo from '../../assets/51244-blue-grey-spiral-vector.svg';
import './header.style.css';


class Header extends Component {
  /**
   * Constructor
   */
  constructor () {
    super();
    this.state = {
      display: true
    };

    this.headerMethodExample = this.headerMethodExample.bind(this);
  }

  headerMethodExample () {
    return false;
  }
  render() {
    return (
      <header className="App_header__container">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MyCollection
        </p>
        { this.props.onHeaderHandleButton() }
      </header>
    );
  };
}

export default Header;
