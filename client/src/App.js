import "./App.scss";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import React from "react";
import { Route, Switch } from "react-router-dom";
import Fade from "react-reveal/Fade";
import io from "socket.io-client";

import HomePage from "./components/HomePage";
import AppNavbar from "./components/Navbar";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Confirm from "./components/auth/Confirm"

import ProfileRestaurant from "./components/profilePage/ProfileRestaurant";
import ProfileUser from "./components/profilePage/ProfileUser";
import EditUser from "./components/profilePage/EditUser";

import Basket from "./components/orders/Basket";
import UserOrderDetails from "./components/orders/UserOrderDetails";
import RestaurantOrderList from "./components/orders/RestaurantOrderList";

import ProductDetails from "./components/products/ProductDetails";
import AddProduct from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";
import Products from "./components/products/Products";

import { loggedin } from "./components/auth/auth-service";

class App extends React.Component {
  state = {
    loggedInUser: null,
    basket: [],
  };

  socket = io(`${process.env.REACT_APP_APIURL || ""}`, { autoConnect: false });

  componentDidMount() {
    this.getLocalStorageBasket();
    this.fetchUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.basket !== prevProps.basket) {
      this.setLocalStorageBasket();
    }
  }

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

  getLocalStorageBasket = () => {
    let storageBasket = localStorage.getItem("basket");
    let basket = storageBasket !== null ? JSON.parse(storageBasket) : [];
    this.setState({ basket });
  };

  setLocalStorageBasket = () => {
    const basket = JSON.stringify(this.state.basket);
    localStorage.setItem("basket", basket);
  };

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
    } else {
      const basket = [...this.state.basket];
      const idx = basket.findIndex( product => product._id === item._id)
      if(idx >= 0){
        let productToModif = basket[idx]
        productToModif.quantity += 1
        basket[idx] = productToModif
      }    
      this.setState({basket})
    }
  };

  updateBasket = (basket) => {
    this.setState({ basket });
  };

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
                  path="/products"
                  render={(props) => (
                    <Products userInSession={this.state.loggedInUser} {...props} />
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
                  path="/products/edit/:id"
                  render={(props) => (
                    <EditProduct
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
                      updateUser={this.updateLoggedInUser}
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
                <Route
                  exact
                  path="/orders/:id"
                  render={(props) => (
                  <UserOrderDetails
                    userInSession={this.state.loggedInUser}
                    socket={this.socket}
                    {...props}/>)} 
                  />
                <Route
                  exact
                  path="/products/new"
                  render={(props) => (
                    <AddProduct {...props} />
                  )}
                />
                <Route
                  exact
                  path="/restaurant/orders/"
                  render={(props)=> (
                    <RestaurantOrderList
                    userInSession={this.state.loggedInUser}
                    socket={this.socket}
                    {...props}/>
                  )}
                />
                <Route
                  exact
                  path="/confirm/:email/:token"
                  render={(props)=> (
                    <Confirm
                    userInSession={this.state.loggedInUser}
                    {...props}/>
                  )}
                />
                {/* <Route
                  exact
                  path="/notification"
                  render={(props)=> (
                    <MailSendedNofication
                    userInSession={this.state.loggedInUser}
                    {...props}/>
                  )}
                /> */}
                <Fade bottom>
                  <Route
                    exact
                    path="/products/:id"
                    render={(props) => (
                      <ProductDetails
                        updateBasket={this.addToBasket}
                        {...props}
                      />
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
