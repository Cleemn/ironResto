import "./App.scss";
import React from "react";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/products/ProductDetails";
import Navbar from "./components/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ProfileRestaurant from "./components/profilePage/ProfileRestaurant";
import ProfileUser from "./components/profilePage/ProfileUser";
import UserBasket from "./components/orders/UserBasket";
import { Route, Switch } from "react-router-dom";

import { loggedin } from "./components/auth/auth-service";
import Fade from "react-reveal/Fade";

class App extends React.Component {
  state = {
    loggedInUser: null,
    basket: [],
  };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      loggedin()
        .then((response) => {
          this.setState({ loggedInUser: response });
        })
        .catch((err) => {
          this.setState({ loggedInUser: false });
        });
    }
  }

  updateBasket = (item) => {
    this.setState({
      basket: [...this.state.basket, item],
    });
  };

  initBasket = () => {
    this.setState({ basket: [] });
  }

  componentDidMount() {
    this.fetchUser();
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    console.log("basket", this.state.basket);
    return (
      <div className="App">
        <Route
          render={(props) => (
            <>
              <Navbar
                userInSession={this.state.loggedInUser}
                updateUser={this.updateLoggedInUser}
                basket={this.state.basket}
                {...props}
              />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <HomePage updateBasket={this.updateBasket} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={(props) => (
                    <Login updateUser={this.updateLoggedInUser} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/signup"
                  render={(props) => (
                    <Signup updateUser={this.updateLoggedInUser} {...props} />
                  )}
                />
                <Route exact path="/products/:id" component={ProductDetails} />
                <Route
                  exact
                  path="/profile/user"
                  render={(props) => (
                    <ProfileUser
                      userInSession={this.state.loggedInUser}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/profile/restaurant"
                  render={(props) => (
                    <ProfileRestaurant
                      userInSession={this.state.loggedInUser}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/user/order"
                  render={(props) => (
                    <UserBasket
                      userInSession={this.state.loggedInUser}
                      updateBasket={this.updateBasket}
                      basket={this.state.basket}
                      initBasket={this.initBasket}
                      {...props}
                    />
                  )}
                />
              </Switch>
            </>
          )}
        />
      </div>
    );
  }
}

export default App;
