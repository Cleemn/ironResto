import React from "react";
import axios from "axios";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

const baseURL = `${process.env.REACT_APP_APIURL || ""}`

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
    _id: "",
    items: [],
    name: "",
    total_price: 0,
    status: "",
    date: '',
    photo: "",
    dayWeek: "",
    day: "",
    month:"",
    progress: 0,
    time: "",
    min: "",
    hour: ""
  };

  convertDate(date) {
    let orderDate = new Date(date);
    let dayWeek = frenchDays[orderDate.getDay()];
    let day = orderDate.getDate();
    let month = frenchMonths[orderDate.getMonth()];
    let year = orderDate.getFullYear();
    let hour = orderDate.getHours();
    let min = orderDate.getMinutes();
    min < 10 ? min = '0' + min : min = min;
    hour < 10 ? hour = '0' + hour : hour = hour;
    return { dayWeek, day, month, year, min, hour };
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

  componentDidMount() {
    this.props.socket.connect();
    const { params } = this.props.match;
    
    this.getSingleOrder()
    // get new status from order:update:orderId topic
    this.props.socket.on(`order:update:${params.id}`, (newStatus) => {
      this.setState({status:newStatus})
      this.convertStatus(this.state.status);
    })
    
  }

  componentWillUnmount() {
    this.props.socket.disconnect();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState._id !== "" && this.state._id) {
      // console.log("componentDidUpdate", this.state)
    }
  }

  getSingleOrder = () => {
    const { params } = this.props.match;
    return axios
      .get(`${baseURL}/api/orders/${params.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const order = response.data[0];
        if (order) {
          const { items, name, total_price, status, date } = order;
          this.setState({ items, name, total_price, status, date });
          this.convertStatus(status);
          this.convertDate(date);
        }
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ errorMessage: error.response.data.message });
        }
      });
  };

  render() {
    const { dayWeek, day, month, hour, min } = this.convertDate(this.state.date);
    const date = `${dayWeek} ${day} ${month} à ${hour}h${min}`;
    const price = `${this.state.total_price}€`;
    return (
      <div id="order-details" className="all-orders container mt-3">
        <div className="ongoing-orders">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <a href="/profile/user">
              <img src="/arrow-black-left.png" alt="" style={{width: '32px', height: '32px'}}></img>
            </a>
            <h6>Ma commande en cours</h6>
          </div>
          <div className="accordion-item--opened accordion-list">
            <div className="accordion-item__line container">
              <h6 className="accordion-item__title">{date}</h6>
              <h6 className="accordion-item__price">{price}</h6>
            </div>
            <div className="accordion-item__line container">
              {this.state.items.length === 1 ? (<p>{this.state.items.length} item</p>) : (<p>{this.state.items.length} items</p>)} 
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
