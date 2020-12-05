import React from "react";
import getSingleOrder from "../services/order-service";
import axios from "axios";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
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
    month:"",
    progress: 0
  };

  convertDate(date) {
    let orderDate = new Date(Date(date));
    let dayWeek = frenchDays[orderDate.getDay()];
    let day = orderDate.getDate();
    let month = frenchMonths[orderDate.getMonth()];
    let year = orderDate.getFullYear();
    this.setState({ dayWeek, day, month, year });
  }

  convertStatus(status) {
    if (status === 'en_attente') {
      this.setState({progress: 20})
    } else if (status === 'acceptee') {
      this.setState({progress: 40})
    } else if (status === 'en_cours') {
      this.setState({progress: 60})
    } else if (status === 'commande_prete') {
      this.setState({progress: 80})
    } else {
      this.setState({progress: 100})
    }
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
          this.convertDate(date);
          this.convertStatus(status);
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
    const date = `${this.state.dayWeek} ${this.state.day} ${this.state.month}`;
    const price = `${this.state.total_price}€`;
    return (
      <div className="all-orders container">
        <div className="ongoing-orders">
          <h6>Ma commande en cours</h6>
          <div className="accordion-item--opened">
            <div className="accordion-item__line container">
              <h6 className="accordion-item__title">{date}</h6>
              <h6 className="accordion-item__price">{price}</h6>
            </div>
            <div className="accordion-item__line container">
              <p>{this.state.items.length} items</p>
            </div>
            <div className="accordion-item__content container">
              {this.state.items.map((item, i) => {
                const product = item.product_id;
                return (
                  <div key={i} className="accordion-item__product">
                    <img src={`${product.photo}`} alt=""></img>
                    <p>{item.quantity}</p>
                    <p>{product.name}</p>
                    <p className="price">{product.price}€</p>
                  </div>
                );
              })}
            </div>
            
          </div>
          <div className="status">
            <ProgressBar
              percent={this.state.progress}
              filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
            />
          </div>

          <div className="map"></div>

          {this.state.errorMessage && (
            <div className="message">
              <p>{this.state.errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserOrderDetails;
