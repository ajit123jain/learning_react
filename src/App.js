import Header from './components/Header';
import Login from './components/Login';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

import './App.css';


const Home = () => {
  return <h2>Home Page</h2>;
};

const About = () => {
  return <h2>About Page</h2>;
};

const Contact = () => {
  return <h2>Contact Page</h2>;
};

const Profile = (props) => {
  let user_id = props.current_user && props.current_user.id ;
  let url = "/profile/"+ user_id; 
  return (
    <div>
      <h2>Profile Page</h2>
      <Link to={url}>Edit Profile</Link>
    </div>
  );
};

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

const NotFound = () => {
  return <h2>Page Not found.</h2>;
};


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      current_user: null
    }
    this.afterLogin = this.afterLogin.bind(this);
  }

  afterLogin(isSuccess, loggedInUser = null){
    this.setState({
      isLoggedIn: (isSuccess ? true : false),
      current_user: loggedInUser
    }); 
    console.log(this.state.current_user)  
  }

  render() {
    const {isLoggedIn, current_user} = this.state
    return (
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn}  />
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" exact={true} 
            render={(props) => (
              <Profile {...props} isLoggedIn={isLoggedIn} current_user={current_user} />
            )}
          />
          <Route path="/profile/:id" 
            render={(props) => (
              <EditProfile {...props} isLoggedIn={isLoggedIn} current_user={current_user} />
            )}
            />
          <Route path="/login" 
            render={(props) => (
              <Login {...props} isLoggedIn={this.state.isLoggedIn} afterLogin={this.afterLogin} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;


