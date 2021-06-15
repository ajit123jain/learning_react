import React, { Component } from 'react';
import LoginService from "../services/LoginService";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import LocalStorage from '../libs';
import { withCookies, Cookies } from "react-cookie";

class Profile extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.cookies.get('user_id'),
      subdomain: this.props.cookies.get('subdomain')
    };
    this.signOutUser = this.signOutUser.bind(this);
    this.afterLogout = props.afterLogout.bind(this);
  }

  signOutUser(){
    LoginService.signOut({"subdomain": this.state.subdomain})
    .then(response => {
      if(response.status == 200 || response.status == "ok"){
        const host = process.env.REACT_APP_HOST + ':' +process.env.REACT_APP_PORT
        const login_page = `http://${host}/login`
        this.props.cookies.remove('user_id', {domain: `.${process.env.REACT_APP_DOMAIN}` })
        this.props.cookies.remove('subdomain', {domain:  `.${process.env.REACT_APP_DOMAIN}`})
        window.location = login_page
      }
      else{
        alert("Couldn't logout. Please try again.")
      }
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
export default withCookies(Profile)