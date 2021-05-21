import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    let button;
    if (isLoggedIn)
      {
        button = <NavLink to="/profile" activeClassName="active">Profile</NavLink>;
      }
    else
      {
        button = <NavLink to="/login" activeClassName="active">Login</NavLink>;
      }
    return (
      <ul className="navigation-menu">
        <li>
          <NavLink to="/" activeClassName="active" exact={true}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
        <li>{button}</li>
      </ul>
    );
  }
}

export default Header;
