import React from "react";
import { createOrder } from "../services/order-service";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const INIT_STATE = {
  errorMessage: "",
  totalPrice: 0,
  orderId: "",
};

class Basket extends React.Component {
  state = INIT_STATE;

  addOrder = (e) => {
    e.preventDefault();
    if (JSON.parse(localStorage.basket).length !== 0) {
      const products = [...JSON.parse(localStorage.basket)];

      let items = products.map((product) => {
        return { product_id: product._id, quantity: product.quantity };
      });

      createOrder({ items })
        .then((createdOrder) => {
          this.props.history.push(`/orders/${createdOrder._id}`);
          this.props.updateBasket([]);
          this.props.updateQuantity(0);
          this.setState(INIT_STATE);
          localStorage.clear();
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message });
          }
        });
    }
  };

  IncreaseQuantity = () => {
    // this.setState({ clicks: this.state.clicks + 1 });
  };

  DecreaseQuantity = () => {
    // if (this.state.clicks > 1) {
    //   this.setState({ clicks: this.state.clicks - 1 });
    // }
  };

  totalPrice() {
    if (localStorage.basket) {
      let basket = [...JSON.parse(localStorage.basket)];
  
      let totalPrice = 0;
  
      totalPrice = basket.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);
  
      this.setState({ totalPrice });
    }
  }

  removeProduct = (event, productId) => {
    if (localStorage.basket) {
      let basket = JSON.parse(localStorage.basket).filter((product) => {
        return product._id !== productId;
      });
      this.props.updateBasket(basket);
    }
  };

  componentDidMount() {
    this.totalPrice();
    this.removeProduct();
  }

  render() {
    return (
      <div className="basket">
        {localStorage.length === 0 ? (
          <EmptyBasket />
        ) : (
          <div className="basket-details">
            <div className="restaurant-details">
              <h6>Adresse du restaurant</h6>
              <p>📍 123 boulevard Saint-Germain
              <br/>75006, Paris</p>
            </div>
            <ul className="product-list">
              <li className="product-list-content">
                {JSON.parse(localStorage.basket).map((product, i) => {
                  return (
                    <ProductCart
                      product={{ ...product }}
                      IncreaseQuantity={this.IncreaseQuantity}
                      DecreaseQuantity={this.DecreaseQuantity}
                      removeProduct={this.removeProduct}
                      key={i}
                    />
                  );
                })}
              </li>
            </ul>

            <h4>Prix total: {this.state.totalPrice}€</h4>
            <p>A payer sur place</p>

            {this.state.errorMessage ? (
              <div className="error-message">
                <p>{this.state.errorMessage}</p>
              </div>
            ) : (
              <button
                className="btn btn-orange btn-block"
                onClick={(e) => {
                  this.props.userInSession
                    ? this.addOrder(e)
                    : this.props.history.push("/login");
                }}
              >
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
  render() {
    return (
      <div id="basket" className="all-orders container mt-3">
        <div className="ongoing-orders">
          <h6>Je commande :</h6>
          <div className="accordion-item--opened accordion-list">
            <div className="accordion-item__line container">
            </div>
            <div className="accordion-item__content container">
              <div className="accordion-item__product">
                <img src={`${this.props.product.photo}`}  alt=""></img>
                <p>{this.props.product.quantity}</p>
                <p>{this.props.product.name}</p>
                <p className="price">{this.props.product.price}€</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

class EmptyBasket extends React.Component {
  state = {};
  render() {
    return (
      <div className="product-cart empty-basket">
        <img src="../shopping-basket-color.svg" alt=""></img>
        <h5>Votre panier est vide</h5>
        <div className="buttons">
          <Button href="/">
            Regarder la carte
          </Button>
        </div>
      </div>
    );
  }
}

export default Basket;
