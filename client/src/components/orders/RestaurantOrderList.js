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
    this.props.socket.on(`add:order`, (newOrder) => {
      this.updateOrder(newOrder)
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

  sortByType = (e) => {
    axios
      .get("http://localhost:5000/api/orders?date=today", {
        withCredentials: true,
      })
      .then(responseFromApi => {
        const sortOrders = responseFromApi.data.filter(order => order.status === e.target.id);
        this.setState({
          orders: sortOrders,
        });
      })
      .catch((err) => console.log("Error while fetching orders", err));
  };
  
  render() {
    return (
      <div className="restaurant-list">
        <div className="links container d-flex justify-content-between align-items-center">
          <a href="/profile/restaurant">
            <img src="/arrow-black-left.png" alt="" style={{width: '32px', height: '32px'}}></img>
          </a>
        </div>
        <div className="buttons container">
          <button onClick={this.getDailyOrders} className="my-3 mx-2">
            Voir tout
          </button>
          <button onClick={this.sortByType} id="en_attente" className="my-3 mx-2">
            En attente
          </button>
          <button onClick={this.sortByType} id="acceptee" className="my-3 mx-2">
            Acceptée
          </button>
          <button onClick={this.sortByType} id="en_cours" className="my-3 mx-2">
            En prep.
          </button>
          <button onClick={this.sortByType} id="commande_prete" className="my-3 mx-2">
            Prête
          </button>
          <button onClick={this.sortByType} id="commande_recuperee" className="my-3 mx-2">
            Récupérée
          </button>
        </div>
        <div className="container">
        {this.state.orders.length === 0 ? (
              <p>Il n'y a pas de commande pour le moment.</p>
            ) : (
              <div {...{ className: "wrapper" }}>
                <ul {...{ className: "accordion-list" }}>
                  {this.state.orders.map((order, key) => {
                    const date = `${(new Date(order.date)).getHours()}:${(new Date(order.date)).getMinutes()}:${(new Date(order.date)).getSeconds()}`
                    return (
                      <li {...{ className: "accordion-list__item", key }}>
                        <Accordion
                          date={date}
                          orderId={order._id}
                          items={order.items}
                          status={order.status}
                          updateStatus={this.updateOrderStatus}
                          {...this.props}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
        </div>
      </div>
    );
  }
}

class Accordion extends React.Component {
  state = {
    opened: false
  };

  render() {
    const {
      state: { opened },
    } = this;
    return (
      <div
        {...{
          className: `accordion-item, ${opened && "accordion-item--opened"}`,
        }}
      >
        <div
          {...{
            className: "accordion-item__line container",
          }}
        >
          <h6 {...{ 
            className: "accordion-item__title", 
            onClick: () => {
              this.props.history.push(`/orders/${this.props.orderId}`)
          },
            }}>Commande passée à : {this.props.date}</h6>
          <h6 {...{ className: "accordion-item__price" }} style={{width: '30%'}}>
            {this.props.status.charAt(0).toUpperCase() + this.props.status.slice(1).replace('_', ' ')}
          </h6>
        </div>
        <div
          {...{
            className: "accordion-item__line container",
          }}
        >
          <div>
            {this.props.items.length === 1 ? (<p>{this.props.items.length} item</p>) : (<p>{this.props.items.length} items</p>)}
          </div>
          <span
            {...{
              className: "accordion-item__icon",
              onClick: () => {
                this.setState({ opened: !opened });
              },
            }}
          />
        </div>
        <div {...{ className: "accordion-item__inner justify-content-between align-items-center" }}>
          <div {...{ className: "accordion-item__content d-flex justify-content-between" }} style={{paddingBottom: '0', backgroundColor: 'white'}}>
            <div
              className="acceptee status"
              onClick={(e) => {
                this.props.updateStatus(this.props.orderId, "acceptee");
              }}
            >
              Accepté
            </div>
            <div
              className="en_cours status"
              onClick={(e) => {
                this.props.updateStatus(this.props.orderId, "en_cours");
              }}
            >
              En préparation
            </div>
            <div
              className="commande_prete status"
              onClick={(e) => {
                this.props.updateStatus(this.props.orderId, "commande_prete");
              }}
            >
              Prête
            </div>
            <div
              className="commande_recuperee status"
              onClick={(e) => {
                this.props.updateStatus(this.props.orderId, "commande_recuperee");
              }}
            >
              Récuperée
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantOrderList;
