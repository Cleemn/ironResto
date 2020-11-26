import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProductDetails extends Component {
  state = {}

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

  render(){
    return(
      <div id="product-detail">
        <img src={this.state.photo} alt=""/>
        <div>
          <h5>{this.state.name}</h5>
          <h5>{this.state.price}</h5>
        </div>
        <p>{this.state.description}</p>
        <Link to={'/'}>Revenir</Link>
      </div>
    )
  }
}

export default ProductDetails;