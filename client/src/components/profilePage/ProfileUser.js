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
    let month = frenchMonths[orderDate.getMonth()];
    let year = orderDate.getFullYear();
    return { dayWeek, day, month, year };
  }

  componentDidMount() {
    orders().then((userOrders) => {
      this.setState({ orders: userOrders });
    });
  }

  render() {

    return (
      <>
        <div className="user-info">
          <h1>
            Petit <br /> Nicolas
          </h1>
          <img
            src="https://icon-library.net/icon/default-user-icon-29.html"
            alt=""
          ></img>
        </div>

          <div className="profile-orders">
          <h2>Mes commandes</h2>
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
      </>
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
            {date} 
          </h3>
          <h4 {...{ className: "accordion-item__price" }}>Total: {price}</h4>

          <span {...{ className: "accordion-item__icon" }} />
        </div>
        <div {...{ className: "accordion-item__inner" }}>
          <div {...{ className: "accordion-item__content" }}>
            {items.map((item, i) => {
              const product = item.product_id
              return (
                <div key={i} {...{ className: "accordion-item__product" }}>
                  <img
                    src={`${product.photo}`}
                    alt=""
                  ></img>
                  <p>{item.quantity}</p>
                  <p>{product.name}</p>
                  <p className="price">{product.price}€</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileUser;
