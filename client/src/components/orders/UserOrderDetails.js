import React from "react";
import getSingleOrder from "../services/order-service";
import axios from 'axios';
// import { Link } from "react-router-dom";

class UserOrderDetails extends React.Component {
  state = {
    order: {},
    errorMessage: "",
  };

  getSingleOrder = () => {
    const { params } = this.props.match;

    axios.get(`http://localhost:5000/api/orders/${params.id}`, { withCredentials: true })
      .then((response) => {
        const order = response.data[0]
        this.setState({ order });
    
        console.log("order", this.state.order)
    
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ errorMessage: error.response.data.message });
        }
      });
  };

  componentDidMount() {
    this.getSingleOrder()
  }

  render() {
    return <div className="user-order-details">
    <p>User ORDER Details</p>
    <p>{this.state.order.total_price}</p>
    <p>{this.state.order.status}</p>
    {this.state.errorMessage && (
          <div className="message">
            <p>{this.state.errorMessage}</p>
          </div>
        )}
    </div>;
  }
}

export default UserOrderDetails;
