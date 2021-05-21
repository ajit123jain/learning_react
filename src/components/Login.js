import React, { Component } from 'react';
import LoginService from "../services/LoginService";

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

  signInformSubmit(){
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    LoginService.create(data)
      .then(response => {
        // this.setState({
        //   errors: null
        // });
        this.afterLogin(true);
        this.props.history.push("/profile");
        console.log(response.data);
      })
      .catch(e => {
        this.setState({
          errors: "Invalid Username and Password."
        });
        console.log(e);
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

export default Login;