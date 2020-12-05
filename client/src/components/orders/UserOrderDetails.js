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
    progress: 0,
    time: ""
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
      this.setState({progress: 0, time: "Votre commande n'a pas encore été acceptée par le restaurant."});
    } else if (status === 'acceptee') {
      this.setState({progress: 25, time: "Votre commande a été acceptée, elle sera prête dans 30 minutes environ."});
    } else if (status === 'en_cours') {
      this.setState({progress: 50, time: "Votre commande est en cours de préparation, elle sera prête dans 20 minutes environ."});
    } else if (status === 'commande_prete') {
      this.setState({progress: 75, time: "Votre commande est prête, vous pouvez venir la récupérer au restaurant."});
    } else {
      this.setState({progress: 100, time: "Cette commande a été récupérée au restaurant et est maintenant terminée."});
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
      <div id="order-details" className="all-orders container mt-3">
        <div className="ongoing-orders">
          <h6>Ma commande en cours</h6>
          <div className="accordion-item--opened accordion-list">
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
            <p>{this.state.time}</p>
            <ProgressBar
              percent={this.state.progress}
              filledBackground="linear-gradient(to right, #fcbf99, #FA8334)"
            />
          </div>

          <div className="map">
            <p>Le restaurant se situe ici :</p>
            <img src="/map.png" alt=""/>
          </div>

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
