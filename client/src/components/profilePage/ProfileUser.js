import React from "react";
import { orders } from "../services/order-service";
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
  };

  convertDate(date) {
    let orderDate = new Date(Date(date));
    let dayWeek = frenchDays[orderDate.getDay()];
    let day = orderDate.getDate();
    let month = frenchMonths[orderDate.getMonth() + 1];
    let year = orderDate.getFullYear();
    return { dayWeek, day, month, year };
  }

  componentDidMount() {
    orders().then((userOrders) => {
      this.setState({ orders: userOrders });
    });
  }

  render() {
    console.log(this.state.orders);

    return (
      <div className="profile-user">
        <div {...{ className: "wrapper" }}>
          <ul {...{ className: "accordion-list" }}>
            {this.state.orders.map((order, key) => {
              const { dayWeek, day, month, year } = this.convertDate(
                order.date
              );
              const date = `${dayWeek} ${day} ${month}`;
              const price = `${order.total_price}€`;
              return (
                <li {...{ className: "accordion-list__item", key }}>
                  <AccordionItem {...{ date, price, items: order.items }} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

class AccordionItem extends React.Component {
  state = {
    opened: false,
  };

  render() {
    const {
      props: { items, date, price },
      state: { opened },
    } = this;

    return (
      <div
        {...{
          className: `accordion-item, ${opened && "accordion-item--opened"}`,
          onClick: () => {
            this.setState({ opened: !opened });
          },
        }}
      >
        <div {...{ className: "accordion-item__line" }}>
          <h3 {...{ className: "accordion-item__title" }}>
            {date}{" "}
            <h4 {...{ className: "accordion-item__price" }}>Total: {price}</h4>
          </h3>
          <span {...{ className: "accordion-item__icon" }} />
        </div>
        <div {...{ className: "accordion-item__inner" }}>
          <div {...{ className: "accordion-item__content" }}>
            {items.map((item, i) => {
              return (
                <p key={i} {...{ className: "accordion-item__product" }}>
                  {item._id}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileUser;
