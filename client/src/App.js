import './App.scss';
import React from 'react';
import HomePage from './components/HomePage';
import ProductDetails from './components/products/ProductDetails';
import Navbar from './components/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ProfileRestaurant from './components/profilePage/ProfileRestaurant'
import ProfileUser from './components/profilePage/ProfileUser'
// import ProductList from './components/products/ProductList';
import { Route, Switch } from 'react-router-dom';

import { loggedin } from './components/auth/auth-service';
import Fade from 'react-reveal/Fade';

class App extends React.Component {
  state = { loggedInUser: null}

 
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
    console.log("process.env => ", process.env)
    this.fetchUser();
  }
 
  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  
  render() {
    return (
      <div className="App">
          <Navbar userInSession={this.state.loggedInUser} updateUser={this.updateLoggedInUser} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path='/login' render={() => <Login updateUser={this.updateLoggedInUser}/>}/> */}
            {/* <Route exact path="/login" component={Login} /> */}
            {/* <Route exact path='/signup' render={() => <Signup updateUser={this.updateLoggedInUser}/>}/> */}
            <Fade bottom>
              <Route exact path="/products/:id" component={ProductDetails}/>
            </Fade>
            <Route exact path='/login' render={(props) => <Login updateUser={this.updateLoggedInUser} {...props}/>}/>
            <Route exact path='/signup' render={(props) => <Signup updateUser={this.updateLoggedInUser} {...props}/>}/>
            <Route exact path="/products/:id" component={ProductDetails}/>
            <Route exact path="/profile/user" component={ProfileUser}/> 
            <Route exact path="/profile/restaurant" component={ProfileRestaurant}/> 
          </Switch>
      </div>
    );
  }
}

export default App;
