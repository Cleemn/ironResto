import React, { createRef, Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import * as d3 from "d3";
import StyledContentLoader from 'styled-content-loader';

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
      chartData: [],
    };

    this.ref = createRef();
    this.createPie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);
    this.createArc = d3.arc().innerRadius(60).outerRadius(100);
    this.colors = d3.scaleOrdinal()
    .domain(orderStatus)
    .range(["#FA8334", "#EF6069", "#C1588D", "#805A94", "#47567E"])

    this.format = d3.format(".2f");
  }

  componentDidMount() {
    this.getDailyOrders().then(() => {
      this.orderDataByStatus();
      this.drawChart();
    });
  }

  getDailyOrders = () => {
    return Axios.get("http://localhost:5000/api/orders?date=today", {
      withCredentials: true,
    })
      .then((response) => {
        this.setState({ orders: response.data });
      })
      .catch((error) => this.setState({ errorMessage: error }));
  };

  orderDataByStatus() {
    let chartData = [];
    for (let i = 0; i < orderStatus.length; i++) {
      const filteredData = this.state.orders.filter(
        (order) => orderStatus[i] === order.status
      );

      chartData.push({ value: filteredData.length, label: orderStatus[i] });
    }
    this.setState({ chartData });
  }

  drawChart = () => {
    const svg = d3.select(this.ref.current);
    const data = this.createPie(this.state.chartData);
    const [width, height,outerRadius] = [200, 200, 100];

    svg.attr("class", "chart").attr("width", width).attr("height", height);

    const group = svg
      .append("g")
      .attr("transform", `translate(${outerRadius} ${outerRadius})`);

    const groupWithEnter = group.selectAll("g.arc").data(data).enter();

    const path = groupWithEnter.append("g").attr("class", "arc");

    path
      .append("path")
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d, i) => this.colors(d.index));

    path
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", (d) => `translate(${this.createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .attr("dy", ".35em")
		  .text(function(d) {
        if (d.value !== 0)return d.data.label ;
      })      
  };

  render() {
    return (
      <div className="profile-restaurant container">
          <div className="user-info">
            <h2>
              {this.props.userInSession ? (
                this.props.userInSession.username
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

        <div className="daily-orders">
          <div className="chart">
            <svg ref={this.ref} />
          </div>
          <h5>Aujourd'hui<span> {this.state.orders.length}</span> commandes ont été passées.</h5>
        </div>

        <Link to="/restaurant/orders/">
          <div className="restaurant-link">
            <p>Gestion de commandes</p>
          </div>
        </Link>
        <Link to="/restaurant/products/">
          <div className="restaurant-link">
            <p>Gestion de produits</p>
          </div>
        </Link>
        <Link to="/products/new/">
          <div className="restaurant-link">
            <p>Ajouter un produit</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProfileRestaurant;
