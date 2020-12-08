import React, { Component } from "react";
import axios from "axios";

class RestaurantOrderList extends Component {
  state = {
    orders: [],
    errorMessage: "",
  };

  componentDidMount() {
    this.getDailyOrders();
  }

  getDailyOrders = () => {
    return axios
      .get("http://localhost:5000/api/orders?date=today", {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({ orders: response.data });
      })
      .catch((error) => this.setState({ errorMessage: error }));
  };

  render() {
    return (
      <div className="add-product">
        Restaurant Order List Page
        {this.state.orders.map((order) => {
          return <OrderCart order={order}></OrderCart>;
        })}
      </div>
    );
  }
}

class OrderCart extends Component {
  state = {};

  render() {
    return (
      <div className="order-cart">
        <h4>{this.props.order.date}</h4>
        <div className="status accepte">Accepté</div>
        <div className="status preparation">En préparation</div>
        <div className="status prete">Prete</div>
        <div className="status recupere">Recuperée</div>
      </div>
    );
  }
}

export default RestaurantOrderList;
