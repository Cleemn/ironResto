import React from "react";
import { createOrder } from "../services/order-service";
import { Link } from "react-router-dom";

const INIT_STATE = {
  errorMessage: "",
  totalPrice: 0,
  orderId: "",
};

class UserBasket extends React.Component {
  state = INIT_STATE;

  addOrder = (e) => {
    e.preventDefault();
    if (this.props.basket.length !== 0) {
      const products = [...this.props.basket];

      let items = products.map((product) => {
        return { product_id: product._id, quantity: product.quantity };
      });

      createOrder({ items })
        .then((createdOrder) => {
          this.props.history.push(`/orders/${createdOrder._id}`);
          this.props.initBasket();
          this.setState(INIT_STATE);
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message });
          }
        });
    }
  };

  componentDidMount() {}

  render() {
    return (
      <div className="user-order">
        {this.props.basket.length === 0 ? (
          <EmptyBasket />
        ) : (
          <div className="basket-details">
            <div className="restaurant-details">
              <h2>Adresse du restaurant</h2>
            </div>
            <h2>Ma commande</h2>
            {this.props.basket.map((product) => {
              return <ProductCart product={{ ...product }} />;
            })}
            <h4>Prix total</h4>
            <p>A payer sur place</p>

            {this.state.errorMessage ? (
              <div className="message">
                <p>{this.state.errorMessage}</p>
              </div>
            ) : (
              <button onClick={(e) => this.addOrder(e)}>
                Valider la commande
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

class ProductCart extends React.Component {
  state = {};
  render() {
    return (
      <div className="product-cart">
        <p>{this.props.product.name}</p>
      </div>
    );
  }
}

class EmptyBasket extends React.Component {
  state = {};
  render() {
    return (
      <div className="product-cart">
        <img src="../shopping-basket-color.svg"></img>
        <p>Votre panier est vide</p>
        <Link to="/">
          <button>Avez-vous faim ?</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    );
  }
}

export default UserBasket;
