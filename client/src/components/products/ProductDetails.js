import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProductDetails extends Component {
  state = {
    clicks: 1
  }

  // 👨‍🏫
  componentDidMount(){
    this.getSingleProduct();
  }

  // 👨‍🏫
  getSingleProduct = () => {
      const { params } = this.props.match;
      axios.get(`http://localhost:5000/api/products/${params.id}`)
        .then( responseFromApi =>{
          const theProduct = responseFromApi.data;
          this.setState(theProduct);
        })
        .catch((err)=>{
          console.log('Error while fetching product', err)
        })
  }

  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  DecreaseItem = () => {
    if (this.state.clicks > 1) {
      this.setState({ clicks: this.state.clicks - 1 });
    }
  }

  render(){
    return(
    <div>
      <div id="product-detail">
        <div className="header p-2">
          <Link to={'/'}><img src="../white-arrow.png" alt=""/></Link>
          <img src="../menu.png" alt=""/>
        </div>
        <img className="product-image" src={this.state.photo} alt=""/>
        <div className="product-card">
          <div className="d-flex justify-content-between">
            <h5>{this.state.name}</h5>
            <div className="d-flex justify-content-evenly">
              <h5 className="pr-2 remove" onClick={this.DecreaseItem}>-</h5>
              <h5 className="pr-2 quantity">{ this.state.clicks }</h5>
              <h5 className="pr-2 add" onClick={this.IncrementItem}>+</h5>
            </div>
          </div>
          <h6>{this.state.price} €</h6>
          <div className="portion d-flex justify-content-center">
            <p>{this.state.portion} pers. - {this.state.calories} kcal</p>
          </div>
          <div className="description">
            <h5>Description</h5>
            <p>{this.state.description}</p>
          </div>
          <button type="submit" className="btn btn-orange btn-block">Ajouter au panier</button>
        </div>
      </div>
      <style type="text/css">
        {`.navbar {display: none}`}
      </style>
    </div>
    )
  }
}

export default ProductDetails;