import React from "react";
import { createOrder } from "../services/order-service";
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
            <div className="restaurant-details container mt-4">
                <h6>Adresse du restaurant</h6>
                <p>123 boulevard Saint-Germain
                <br/>75006, Paris</p>
                <span>📍</span>
            </div>
            <h6 className="restaurant-details container mt-4">Ma commande :</h6>
            <ul className="product-list">
              <li className="product-list-content">
                {this.props.basket.map((product, i) => {
                  return (
                    <ProductCart
                      product={{ ...product }}
                      removeProduct={this.removeProduct}
                      basket={this.props.basket}
                      updateBasket={this.props.updateBasket}
                      key={i}
                    />
                  );
                })}
              </li>
            </ul>

            <h5>Prix total : {this.state.totalPrice}€</h5>
            <p>A payer sur place</p>

            {this.state.errorMessage ? (
              <div className="error-message">
                <p>{this.state.errorMessage}</p>
              </div>
            ) : (
              <button
                className="btn btn-orange"
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
  state = {
    clicks:1,
  }

  componentDidMount(){
    this.setState( (prevState, props) => { return {clicks: this.props.product.quantity}})
    }

  componentDidUpdate(prevProps, prevState){
    if(prevState.clicks !== this.state.clicks){
      this.updateQuantity(this.props.product._id, this.state.clicks)
    }
  }

  updateQuantity = (productId, quantity) => {
    if (this.props.basket) {
      const basket = this.props.basket.filter((product) => product._id !== productId);
      let selectedProduct = this.props.basket.filter((product) => product._id === productId)[0];
      selectedProduct.quantity = quantity
      this.props.updateBasket([...basket, selectedProduct])
    }
  }

  IncrementItem = () => {
    this.setState({clicks: this.state.clicks + 1});
    
  }

  DecreaseItem = () => {
    if (this.state.clicks > 1) {
      this.setState({ clicks: this.state.clicks - 1 });   
    }
  }

  render() {
    return (
      <div id="basket" className="all-orders container mt-3">
        <div className="ongoing-orders">
          <div className="accordion-item--opened accordion-list">
            <div className="accordion-item__line container">
            </div>
            <div className="accordion-item__content container">
              <div className="accordion-item__product">
                <img src={`${this.props.product.photo}`}  alt=""></img>
                <p>{this.props.product.name}</p>
                <p className="price">{this.props.product.price}€</p>  
              </div>
              <div className="accordion-item__product d-flex justify-content-between align-items-center">
                <img
                  src="../dustbin.svg"
                  alt=""
                  onClick={(e) => {
                    this.props.removeProduct(e, this.props.product._id);
                  }}
                  className="basket-img"
                ></img>
              </div>
              <div className="d-flex justify-content-evenly">
                    <button style={{border: 'none'}} className="remove" onClick={this.DecreaseItem}>-</button>
                    <div className="px-2 pt-1 quantity">{ this.state.clicks }</div>
                    <button style={{border: 'none'}} className="add" onClick={this.IncrementItem}>+</button>
                  </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class EmptyBasket extends React.Component {
  render() {
    return (
      <div className="product-cart empty-basket container">
        <img src="../shopping-basket-color.svg" alt=""></img>
        <h5 className="text-center">Votre panier semble bien vide 😢</h5>
        <p className="text-center">On dirait que vous n'avez pas encore trouvé votre bonheur...</p>
        <div className="buttons">
          <Button href="/" className="btn btn-orange">
            Découvrir la carte
          </Button>
        </div>
      </div>
    );
  }
}

export default Basket;