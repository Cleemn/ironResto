import React, { createRef, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StyledContentLoader from 'styled-content-loader';

import PieChart, {
  Legend,
  Series,
  Label,
  Connector,
  Size
} from 'devextreme-react/pie-chart';

const baseURL = `${process.env.REACT_APP_APIURL || ""}`

const orderStatus = [
  "en_attente",
  "acceptee",
  "en_cours",
  "commande_prete",
  "commande_recuperee",
];
class ProfileRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      errorMessage: "",
      chartData: []
    };
  }

  componentDidMount() {
    this.getDailyOrders().then(() => {
      this.orderDataByStatus();
    });
  }

  getDailyOrders = () => {
    return axios.get(`${baseURL}/api/orders?date=today`, {
      withCredentials: true,
    })
      .then((response) => {
        this.setState({ orders: response.data });
      })
      .catch((error) => this.setState({ errorMessage: error }));
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  orderDataByStatus() {
    let chartData = [];
    for (let i = 0; i < orderStatus.length; i++) {
      const filteredData = this.state.orders.filter(
        (order) => orderStatus[i] === order.status
      );
      if (filteredData.length > 0) {
        chartData.push({ val: filteredData.length, label: orderStatus[i] });
      }
    }
    this.setState({ chartData });
  }

  customizeLabel(arg) {
    return `${(arg.argumentText).charAt(0).toUpperCase() + (arg.argumentText.replace('_', ' ')).slice(1)} : ${arg.valueText}`;
  }

  render() {
    return (
      <div className="profile-restaurant container">
        <div className="user-info">
          {this.props.userInSession ?
            (
              <h2> {this.capitalizeFirstLetter(this.props.userInSession.firstName)} <br/> {this.capitalizeFirstLetter(this.props.userInSession.lastName)}</h2>
            ) : 
            (<StyledContentLoader></StyledContentLoader>)
          }
          <img src="/avatar.jpeg" alt=""></img>
        </div>
        <div className="daily-orders">
        {this.state.chartData.length > 0 ? (
          <div className="chart">
          <PieChart id="pie" type="doughnut" dataSource={this.state.chartData}>
            <Size height={310} />
            <Series argumentField="label">
              <Label visible={true} format="fixedPoint" customizeText={this.customizeLabel}>
                <Connector visible={true} />
              </Label>
            </Series>
            <Legend visible={false}/>
          </PieChart>
          </div>
        ) : (
          <></>
        )}
          <h5 className="text-center mt-3 mb-5">Aujourd'hui<span> {this.state.orders.length}</span> commandes ont été passées.</h5>
        </div>
        <div className="accordion-item--opened accordion-list mb-4" style={{boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.12)'}}>
          <div className="accordion-item__line container py-3">
            <Link to="/restaurant/orders/">
                <p>Gestion de commandes</p>
            </Link>
            <Link to="/restaurant/orders/">
              <div className="accordion-item__icon"></div>
            </Link>
          </div>
        </div>
        <div className="accordion-item--opened accordion-list mb-4" style={{boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.12)'}}>
          <div className="accordion-item__line container py-3">
            <Link to="/restaurant/products/">
                <p>Gestion de produits</p>
            </Link>
            <Link to="/restaurant/products/">
              <div className="accordion-item__icon"></div>
            </Link>
          </div>
        </div>
        <div className="accordion-item--opened accordion-list mb-4" style={{boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.12)'}}>
          <div className="accordion-item__line container py-3">
            <Link to="/products/new/">
                <p>Ajouter un produit</p>

            </Link>
            <Link to="/products/new/">
              <div className="accordion-item__icon"></div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileRestaurant;
