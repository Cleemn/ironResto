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
    if (this.props.basket.length !== 0) {
      const products = [...this.props.basket];

      let items = products.map((product) => {
        return { product_id: product._id, quantity: product.quantity };
      });

      createOrder({ items })
        .then((createdOrder) => {
          this.props.history.push(`/orders/${createdOrder._id}`);
          this.props.updateBasket([]);
          this.setState(INIT_STATE);
        })
        .catch((error) => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message });
          }
        });
    }
    localStorage.clear();
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
    let basket = [...this.props.basket];

    let totalPrice = 0;

    totalPrice = basket.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);

    this.setState({ totalPrice });
  }

  removeProduct = (event, productId) => {
    if (this.props.basket) {
      let basket = this.props.basket.filter((product) => {
        return product._id !== productId;
      });
      this.props.updateBasket(basket);
    }
  };

  componentDidMount() {
    this.totalPrice();
    this.removeProduct();
    let localCart = localStorage.getItem("basket");
    localCart = JSON.parse(localCart);
    console.log(localCart);
  }

  render() {
    return (
      <div className="basket">
        {this.props.basket.length === 0 ? (
          <EmptyBasket />
        ) : (
          <div className="basket-details">
            <div className="restaurant-details">
              <h2>Adresse du restaurant</h2>
            </div>
            <h2>Ma commande</h2>
            <ul className="product-list">
              <li className="product-list-content">
                {this.props.basket.map((product) => {
                  return (
                    <ProductCart
                      product={{ ...product }}
                      IncreaseQuantity={this.IncreaseQuantity}
                      DecreaseQuantity={this.DecreaseQuantity}
                      removeProduct={this.removeProduct}
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
      <div id="order-details" className="all-orders container mt-3">
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
