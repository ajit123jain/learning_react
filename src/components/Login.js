import React, { Component } from 'react';
import LoginService from "../services/LoginService";
import LocalStorage from '../libs';
import { withCookies, Cookies } from "react-cookie";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: null,
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.signInformSubmit = this.signInformSubmit.bind(this);
    this.afterLogin = props.afterLogin.bind(this);
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState({
      email: email
    }
    );
  }

  onChangePassword(e) {
    const password = e.target.value;
    
    this.setState({
      password: password
    }
    );
  }

  setCookie(key, value){
    const domainWithoutPort = '.'+ process.env.REACT_APP_DOMAIN
    this.props.cookies.set(key, value, {domain: domainWithoutPort})
  }

  signInformSubmit(){
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    LoginService.create(data)
      .then(response => {
        this.setState({
          errors: null
        });
        let user = response.data
        user["authorization"] = response.headers.authorization
        user["subdomain"] = response.headers["tenant-name"]
        this.setCookie('user_id', user.id);
        this.setCookie('subdomain', user.subdomain)


        const profile = `http://${user["subdomain"]}.${window.location.host}/profile`
        window.location.assign(profile)

      })
      .catch(e => {
        this.setState({
          errors: "Invalid Username and Password."
        });

      });

  }

  render() {
    return (
      <div className="card">
        <h2>Please sign in</h2>
          <label className="error">{this.state.errors}</label>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <button
            type="submit"
            className="badge badge-success"
            onClick={this.signInformSubmit}
            >
            Submit
            </button>
        
      </div>
    );
  }
}

export default withCookies(Login);