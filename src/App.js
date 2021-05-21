import Header from './components/Header';
import Login from './components/Login';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
// import * as serviceworker from "./serviceworker";
// import LoginService from "./services/LoginService";
// // import ReactDOM from 'react-dom';
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
  console.log(props);
  return (
    <div>
      <h2>Profile Page</h2>
      <Link to="/profile/10">Edit Profile</Link>
    </div>
  );
};

const EditProfile = (props) => {
  console.log(props);
  return <p>Editing profile page of user with id {props.match.params.id} </p>;
};

const NotFound = () => {
  return <h2>Page Not found.</h2>;
};


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.afterLogin = this.afterLogin.bind(this);
  }

  afterLogin(isSuccess){
    this.setState({
      isLoggedIn: isSuccess ? true : false 
    });   
  }

  render() {
    const {isLoggedIn} = this.state
    return (
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn}  />
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" component={Profile} exact={true} />
          <Route path="/profile/:id" component={EditProfile} />
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


