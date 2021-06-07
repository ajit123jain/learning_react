import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withCookies, Cookies } from "react-cookie";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isLoggedIn = this.props.cookies.get('user_id') ? true : false;
    let button;
    if (isLoggedIn)
      {
        button = <>
                  <li><NavLink to="/posts" activeClassName="active">Posts</NavLink></li>
                  <li><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
                </>;
      }
    else
      {
        button = <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>;
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
          <NavLink to="/pdfs" activeClassName="active">
            Pdfs
          </NavLink>
        </li>
        <li>
          <NavLink to="/poplify_pdfs" activeClassName="active">
            Poplify Pdfs
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/react_hooks" activeClassName="active">
            Post List
          </NavLink>
        </li>
        {button}
      </ul>
    );
  }
}

export default withCookies(Header);
