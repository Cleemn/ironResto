import React from "react";
import axios from "axios";

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
    photo: "",
    dayWeek: "",
    day: "",
    month: "",
  };

  convertDate(date) {
    let orderDate = new Date(Date(date));
    let dayWeek = frenchDays[orderDate.getDay()];
    let day = orderDate.getDate();
    let month = frenchMonths[orderDate.getMonth()];
    let year = orderDate.getFullYear();
    this.setState({ dayWeek, day, month, year });
  }

  componentDidMount() {
    this.props.socket.connect();
    const { params } = this.props.match;
    
    // get new status from order:update:orderId topic
    this.props.socket.on(`order:update:${params.id}`, (newStatus) => {
      this.setState({status:newStatus})   
    })
    
    
    this.getSingleOrder()
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
      .get(`http://localhost:5000/api/orders/${params.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const order = response.data[0];
        if (order) {
          const { _id, items, name, total_price, status, date } = order;
          this.setState({ _id, items, name, total_price, status });
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
        <p>{this.state.status}</p>
        {/* <div className="status">
          <ul className="progress-bar">
            <li className="active">En Attente</li>
            <li className="">Acceptée</li>
            <li className="">En preparation</li>
            <li className="">Prêt</li>
            <li className="">Récupérée</li>
          </ul>
        </div> */}

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
