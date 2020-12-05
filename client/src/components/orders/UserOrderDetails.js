import React from "react";
import getSingleOrder from "../services/order-service";
import axios from "axios";
// import { Link } from "react-router-dom";

const frenchDays = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

const frenchMonths = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

class UserOrderDetails extends React.Component {
  state = {
    errorMessage: "",
    items: [],
    name: "",
    total_price: 0,
    status: "",
    photo: "",
    dayWeek:"", 
    day: "",
    month:""
  };

  convertDate(date) {
    let orderDate = new Date(Date(date));
    let dayWeek = frenchDays[orderDate.getDay()];
    let day = orderDate.getDate();
    let month = frenchMonths[orderDate.getMonth()];
    let year = orderDate.getFullYear();
    this.setState({ dayWeek, day, month, year });
  }

  getSingleOrder = () => {
    const { params } = this.props.match;

    axios
      .get(`http://localhost:5000/api/orders/${params.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const order = response.data[0];
        if (order) {
          const { items, name, total_price, status, date } = order;
          this.setState({ items, name, total_price, status });
          this.convertDate(date)
        }
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ errorMessage: error.response.data.message });
        }
      });
  };

  componentDidMount() {
    this.getSingleOrder();
  }

  render() {
    console.log("this.state", this.state);
    return (
      <div className="order-details">
        <h2>Ma commande</h2>
        <div className="order-cart">

          <h3>{`
                ${this.state.dayWeek} 
                ${this.state.day} 
                ${this.state.month}
          `}</h3>
          <h4>{this.state.total_price} €</h4>
          
          {this.state.items.map((item, i) => {
            const product = item.product_id;
            return (
              <div key={i} className="product-details">
                <h2></h2>
                <img src={`${product.photo}`} alt=""></img>
                <p>{item.quantity}</p>
                <p>{product.name}</p>
                <p className="price">{product.price}€</p>
              </div>
            );
          })}
        </div>
        <p>{this.state.total_price}€</p>
          <div className="status">
            <ul className="progress-bar">
              <li className="active">En Attente</li>
              <li className="">Acceptée</li>
              <li className="">En preparation</li>
              <li className="">Prêt</li>
              <li className="">Récupérée</li>
            </ul>
          </div>

        <div className="map"></div>

        {this.state.errorMessage && (
          <div className="message">
            <p>{this.state.errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
}

export default UserOrderDetails;
