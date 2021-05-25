import React, { Component } from 'react';
import LoginService from "../services/LoginService";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import LocalStorage from '../libs';

export default class Profile extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.current_user.id
    };
    this.signOutUser = this.signOutUser.bind(this);
    this.afterLogout = props.afterLogout.bind(this);
  }

  signOutUser(){
    LoginService.signOut()
    .then(response => {
      window.localStorage.clear();
      this.afterLogout(false, null);
      this.props.history.push("/login");
    })
    .catch(e => {
      alert("Please try again.")
    });
  }
  render() {
    let url = "/profile/"+ this.state.user_id; 
    return (
      <div>
        <h2>Profile Page</h2>
        <Link to={url}>Edit Profile</Link>
        <br></br>
        <button onClick = {this.signOutUser} className="btn-danger">Logout</button>
      </div>
    )
  };


}