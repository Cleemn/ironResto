import "./App.scss";
import React from "react";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/products/ProductDetails";
import AppNavbar from "./components/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ProfileRestaurant from "./components/profilePage/ProfileRestaurant";
import ProfileUser from "./components/profilePage/ProfileUser";
import Basket from "./components/orders/Basket";
import UserOrderDetails from "./components/orders/UserOrderDetails";
import EditUser from "./components/profilePage/EditUser";
import { Route, Switch } from "react-router-dom";

import { loggedin } from "./components/auth/auth-service";
import Fade from "react-reveal/Fade";

class App extends React.Component {
  state = {
    loggedInUser: null,
    basket: [],
    setBasket: null,
    quantity: 0,
    setQuantity: 0
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

  basketContains = (itemId) => {
    let isContains = false;

    for (let i = 0; i < this.state.basket.length; i++) {
      if (this.state.basket[i]._id === itemId) {
        isContains = true;
      }
    }
    return isContains;
  };

  addToBasket = (item) => {
    if (!this.basketContains(item._id)) {
      this.setState({
        basket: [...this.state.basket, item],
        quantity: this.state.quantity += item.quantity
      });
      let stringCart = JSON.stringify(this.state.basket);
      localStorage.setItem('basket', stringCart);
      localStorage.setItem('quantity', this.state.quantity);
    }
  };
  
  updateBasket = (basket) => {
    this.setState({ basket });
  };
  
  componentDidMount() {
    if (localStorage.length !== 0) {
      this.setState({basket: JSON.parse(localStorage.basket), quantity: localStorage.quantity});
    }
    this.fetchUser();
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    return (
      <div className="App">
        <Route
          render={(props) => (
            <>
              <AppNavbar
                userInSession={this.state.loggedInUser}
                updateUser={this.updateLoggedInUser}
                basket={this.state.basket}
                quantity={this.state.quantity}
                {...props}
              />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <HomePage updateBasket={this.addToBasket} {...props} />
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
                <Route
                  exact
                  path="/profile/user"
                  render={(props) => (
                    <ProfileUser
                      userInSession={this.state.loggedInUser}
                      updateUser={this.updateLoggedInUser}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/edit"
                  render={(props) => (
                    <EditUser
                      userInSession={this.state.loggedInUser}
                      updateUser={this.updateLoggedInUser}
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
                    <Basket
                      userInSession={this.state.loggedInUser}
                      basket={this.state.basket}
                      addToBasket={this.addToBasket}
                      updateBasket={this.updateBasket}
                      {...props}
                    />
                  )}
                />
                <Route exact path="/orders/:id" component={UserOrderDetails} />
                <Fade bottom>
                  <Route
                  exact
                  path="/products/:id"
                  render={(props) => (
                    <ProductDetails
                    updateBasket={this.addToBasket}
                    getQuantity= {this.getQuantity}
                      {...props} />
                  )}
                />
                </Fade>
              </Switch>
            </>
          )}
        />
      </div>
    );
  }
}

export default App;
