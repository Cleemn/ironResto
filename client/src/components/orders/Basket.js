import React from "react";
import { createOrder } from "../services/order-service";
import { Link } from "react-router-dom";

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
      <div className="product-cart">
        <span className="cart-header">
          <img src={`${this.props.product.photo}`} alt=""></img>
          <p>{this.props.product.name}</p>
          <p>{this.props.product.price}€</p>
        </span>
        <span className="cart-footer">
          <img
            src="../dustbin.svg"
            alt=""
            onClick={(e) => {
              console.log("clicked", this.props.product);
              this.props.removeProduct(e, this.props.product._id);
            }}
          ></img>
          <div className="d-flex justify-content-evenly">
            <button
              style={{ border: "none" }}
              className="pr-2 remove"
              onClick={this.props.DecreaseQuantity}
            >
              -
            </button>
            <button style={{ border: "none" }} className="pr-2 quantity">
              {this.props.product.quantity}
            </button>
            <button
              style={{ border: "none" }}
              className="pr-2 add"
              onClick={this.props.IncreaseQuantity}
            >
              +
            </button>
          </div>
        </span>
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
        <h2>Votre panier est vide</h2>
        <span className="buttons">
          <Link to="/">
            <button className="btn btn-orange btn-block">
              Avez-vous faim ?
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-orange btn-block">Signup</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-orange btn-block">Login</button>
          </Link>
        </span>
      </div>
    );
  }
}

export default Basket;
