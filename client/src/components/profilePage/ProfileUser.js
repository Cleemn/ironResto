import React from "react";
import { orders } from "../services/order-service";
import StyledContentLoader from 'styled-content-loader';
import AccordionItem from './Accordion';
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
class ProfileUser extends React.Component {
  state = {
    orders: [],
    prevOrders: [],
    onGoingOrders: []
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
    return { dayWeek, day, month, year, hour, min };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  componentDidMount() {
    this.getPreviousOrders();
    this.onGoingOrder();
  }

  getPreviousOrders = () => {
    orders().then((userOrders) => {
      const prev = userOrders.filter(order => order.status === 'commande_recuperee');
      this.setState({ prevOrders: prev });
    });
  }

  onGoingOrder = () => {
    orders().then((userOrders) => {
      const onGoing = userOrders.filter(order => order.status !== 'commande_recuperee');
      this.setState({ onGoingOrders: onGoing });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="user-info">
          <h2>
            {this.props.userInSession ? (
              this.capitalizeFirstLetter(this.props.userInSession.username)
            ) : (
              <StyledContentLoader>
              </StyledContentLoader>
            )}
          </h2>
          <img
            src="https://icon-library.net/images/default-user-icon/default-user-icon-29.jpg"
            alt=""
          ></img>
        </div>
        <div className="all-orders">
          <div className="ongoing-orders">
            <h6>Mes commandes en cours</h6>
            {this.state.onGoingOrders.length === 0 ? (
              <p>Vous n'avez pas de commande en cours.</p>
            ) : (
              <div {...{ className: "wrapper" }}>
                <ul {...{ className: "accordion-list" }}>
                  {this.state.onGoingOrders.map((order, key) => {
                    const { dayWeek, day, month, hour, min } = this.convertDate(order.date);
                    const date = `${dayWeek} ${day} ${month} à ${hour}h${min}`;
                    const price = `${order.total_price}€`;
                    return (
                      <li {...{ className: "accordion-list__item", key }}>
                        <AccordionItem
                          orderId={order._id}
                          date={date}
                          price={price}
                          items={order.items}
                          status={order.status}
                          {...this.props}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="previous-orders">
          <h6>Mes commandes passées</h6>
            {this.state.prevOrders.length === 0 ? (
              <p>Vous n'avez pas encore de commande terminée.</p>
            ) : (
              <div {...{ className: "wrapper" }}>
                <ul {...{ className: "accordion-list" }}>
                  {this.state.prevOrders.map((order, key) => {
                    const { dayWeek, day, month, hour, min } = this.convertDate(order.date);
                    const date = `${dayWeek} ${day} ${month} à ${hour}h${min}`;
                    const price = `${order.total_price}€`;
                    return (
                      <li {...{ className: "accordion-list__item", key }}>
                        <AccordionItem
                          orderId={order._id}
                          date={date}
                          price={price}
                          items={order.items}
                          status={order.status}
                          {...this.props}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}



export default ProfileUser;
