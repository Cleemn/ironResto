import './App.css';
import React from 'react';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import { Route, Switch } from 'react-router-dom';

import { loggedin } from './components/auth/auth-service';

class App extends React.Component {
  state = { loggedInUser: null }
 
  // HERE
  fetchUser() {
    if (this.state.loggedInUser === null){
      loggedin()
        .then(response => {
          this.setState({loggedInUser: response})
        })
        .catch(err => {
          this.setState({loggedInUser: false}) 
        })
    }
  }
 
  // HERE
  componentDidMount() {
    this.fetchUser();
  }
 
  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  
  render() {
    return (
      <div className="App container">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path='/' render={() => <Login updateUser={this.updateLoggedInUser}/>}/> */}
            <Route exact path="/login" component={Login} />
            <Route exact path='/signup' render={() => <Signup updateUser={this.updateLoggedInUser}/>}/>
          </Switch>
      </div>
    );
  }
}

export default App;
