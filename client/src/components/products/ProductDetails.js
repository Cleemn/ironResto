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
      axios.get(`${process.env.REACT_APP_API_URL}/api/products/${params.id}`)
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
        <div className="product-card">
          <img className="product-image" src={this.state.photo} alt=""/>
          <div className="product-description">
            <div className="left"></div>
            <div className="right d-flex flex-column justify-content-between" style={{height: '100%'}}>
              <div>
                <div className="d-flex justify-content-between">
                  <h5>{this.state.name}</h5>
                  <div className="d-flex justify-content-evenly">
                    <button style={{border: 'none'}} className="pr-2 remove" onClick={this.DecreaseItem}>-</button>
                    <button style={{border: 'none'}} className="pr-2 quantity">{ this.state.clicks }</button>
                    <button style={{border: 'none'}} className="pr-2 add" onClick={this.IncrementItem}>+</button>
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
              </div>
              <button type="submit" className="btn btn-orange btn-block">Ajouter au panier</button>
            </div>
          </div>
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