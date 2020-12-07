import React from "react";
import dailyOrders from "../services/order-service"
import { Link } from "react-router-dom";
import Axios from "axios";

class ProfileRestaurant extends React.Component {
  state = {
    orders:[],
    errorMessage:""
  };

  componentDidMount(){
    this.getDailyOrders()
  }

  getDailyOrders = () => {
    Axios.get("http://localhost:5000/api/orders?date=today", {withCredentials:true})
    .then(response => {
      this.setState({orders : response.data})
    })
    .catch(error => this.setState({errorMessage:error.message}))
  }

  render() {
    return (


      <div className="profile-restaurant">
        <p>ProfileRestaurant</p>

        <div className="daily-orders">
          <p>Aujourd'hui {this.state.orders.length} commandes</p>
        </div>
      
        <Link to="/restaurant/orders/">
          <div className="restaurant-link">
            <p>Gestion de commandes</p>
          </div>
        </Link>
        <Link to="/restaurant/orders/">
          <div className="restaurant-link">
            <p>Gestion de produits</p>
          </div>
        </Link>
        <Link to="/restaurant/orders/">
          <div className="restaurant-link">
            <p>Ajouter un produit</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProfileRestaurant;