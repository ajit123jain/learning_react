import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// const Header = () => {
//   return (
//     <ul className="navigation-menu">
//       <li>
//         <NavLink to="/" activeClassName="active" exact={true}>
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/about" activeClassName="active">
//           About
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/contact" activeClassName="active">
//           Contact
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/profile" activeClassName="active">
//           Profile
//         </NavLink>
//       </li>
//     </ul>
//   );
// };

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
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
