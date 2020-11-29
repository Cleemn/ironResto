import React from "react";
import { orders } from "../services/order-service";
// import { Link } from "react-router-dom";

class ProfileUser extends React.Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    orders().then((userOrders) => {
      this.setState({ orders: userOrders });
    });
  }

  render() {
    return (
      <div className="profile-restaurant">
      <p>User Profile</p>

        {/* <lu>
          {this.state.orders.map((order) => {
            <li>{order.name}</li>;
          })}
        </lu> */}
      </div>
    );
  }
}

export default ProfileUser;
