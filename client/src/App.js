import "./App.scss";

import React from "react";
import { Route, Switch } from "react-router-dom";
import Fade from "react-reveal/Fade";
import io from "socket.io-client";

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
import AddProduct from "./components/products/AddProduct"
import RestaurantOrderList from "./components/orders/RestaurantOrderList"
// import EditOrder from "./components/orders/EditOrder"

import { loggedin } from "./components/auth/auth-service";

class App extends React.Component {
  state = {
    loggedInUser: null,
    basket: []
  };

  socket = io('http://localhost:5000/', {autoConnect: false,})

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
      });
    }
  };

  updateBasket = (basket) => {
    this.setState({ basket });
  };

  componentDidMount() {
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
                <Route exact path="/orders/:id" render={(props)=> (<UserOrderDetails socket={this.socket} {...props}/>)} />
                <Route exact path="/products/new" component={AddProduct}/>
                <Route exact path="/restaurant/orders/" render={(props)=> (<RestaurantOrderList socket={this.socket} {...props}/>)}/>        

                {/* <Route exact path="/orders/edit/:id" render={(props)=> (<EditOrder socket={this.socket} {...props}/>)} /> */}
                <Fade bottom>
                  <Route exact path="/products/:id" component={ProductDetails}/>
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
