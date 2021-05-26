import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import About from './components/About';

import PostList from './components/PostList';
import Post from './components/Post';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import LocalStorage from './libs';
import LoginService from "./services/LoginService";
import { browserHistory } from 'react-router';

import './App.css';




const Contact = () => {
  return <h2>Contact Page</h2>;
};

// const Profile = (props) => {
//   let user_id = props.current_user && props.current_user.id ;
//   let url = "/profile/"+ user_id; 
//   return (
//     <div>
//       <h2>Profile Page</h2>
//       <Link to={url}>Edit Profile</Link>
//       <br></br>
//       <button onClick = {props.signOutUser} className="btn-danger">Logout</button>
//     </div>
//   );
// };

const EditProfile = (props) => {
  if (props.current_user){
    return (
    <div>
      <h2>Current logged in user {props.current_user.email}</h2>
      <p>Editing profile page of user with id {props.match.params.id} </p>
    </div>
    ); 
  }
  else{
    return null 
  }
};

// const Post = (props) => {
//   console.log(props)
//   return <h2>Posts List will be here.</h2>;
// };

const NotFound = () => {
  return <h2>Page Not found.</h2>;
};


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: window.localStorage.getItem('token') ? true : false,
      current_user: JSON.parse(window.localStorage.getItem('user'))
    }
    this.afterLogin = this.afterLogin.bind(this);
    this.afterLogout = this.afterLogout.bind(this);
  }

  afterLogin(isSuccess, loggedInUser = null){
    this.setState({
      isLoggedIn: (isSuccess ? true : false),
      current_user: loggedInUser
    }); 
  }

  afterLogout(isLoggedIn, loggedInUser = null){
    this.setState({
      isLoggedIn: (isLoggedIn ? true : false),
      current_user: loggedInUser
    }); 
  }

  

  render() {
    const isLoggedIn = this.state.isLoggedIn
    const current_user = this.state.current_user
    return (
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn}  />
        <Switch>
          <Route path="/" component={Home} user_id= {current_user.id} exact={true} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" exact={true} 
            render={(props) => (
              <Profile {...props} isLoggedIn={isLoggedIn} current_user={current_user} afterLogout={this.afterLogout} />
            )}
          />
          <Route path="/profile/:id" 
            render={(props) => (
              <EditProfile {...props} isLoggedIn={isLoggedIn} current_user={current_user}  />
            )}
            />
          <Route path="/login" 
            render={(props) => (
              <Login {...props} isLoggedIn={this.state.isLoggedIn} afterLogin={this.afterLogin} />
            )}
          />
          <Route path="/posts" exact={true} 
            render={(props) => (
              <PostList {...props} isLoggedIn={isLoggedIn} current_user={current_user} user_id= {current_user.id} />
            )}
          />
          <Route path="/posts/:id" component={Post} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;


