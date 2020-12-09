import React, { Component } from "react";
import axios from "axios";

class RestaurantOrderList extends Component {
  state = {
    orders: [],
    errorMessage: "",
  };

  componentDidMount() {
    this.getDailyOrders();
    this.props.socket.connect();
    this.props.socket.on("add:order", newOrder => {
      const orders = [...this.state.orders];
      const sortedNewOrders = [...orders, newOrder].sort(
        (o1, o2) => new Date(o2.date) - new Date(o1.date)
      );
      this.setState({ orders: sortedNewOrders });
    })
  }

  updateOrder = (newOrder) => {
    const orders = [...this.state.orders];
    const nonUpdatedOrders = orders.filter((order) => {
      return order._id !== newOrder._id;
    });
    const sortedNewOrders = [...nonUpdatedOrders, newOrder].sort(
      (o1, o2) => new Date(o2.date) - new Date(o1.date)
    );
    this.setState({ orders: sortedNewOrders });
  };

  updateOrderStatus = (orderId, newStatus) => {
    axios
      .put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      ).then(resp => {
          this.updateOrder(resp.data);
          // emit new status from client by order:update topic
          // this.props.socket.emit("order:update", orderId, newStatus);
      })
      
  };

  componentWillUnmount() {
    this.props.socket.disconnect();
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
          return (
            <div className="order-cart">
              <h4>Date : {order.date}</h4>
              <h3>Status : {order.status}</h3>
              <div
                className="status accepte"
                onClick={(e) => {
                  this.updateOrderStatus(order._id, "acceptee");
                }}
              >
                Accepté
              </div>
              <div
                className="status preparation"
                onClick={(e) => {
                  this.updateOrderStatus(order._id, "en_cours");
                }}
              >
                En préparation
              </div>
              <div
                className="status prete"
                onClick={(e) => {
                  this.updateOrderStatus(order._id, "commande_prete");
                }}
              >
                Prete
              </div>
              <div
                className="status recupere"
                onClick={(e) => {
                  this.updateOrderStatus(order._id, "commande_recuperee");
                }}
              >
                Recuperée
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default RestaurantOrderList;
