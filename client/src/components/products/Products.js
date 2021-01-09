import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { deleteProduct } from '../services/product-service';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NoAccess from '../errors/NoAccess';
import Login from '../auth/Login';

class Products extends React.Component {
  state = {
    listOfProducts: [],
    search: ""
  };

  getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL || ""}/api/products`)
      .then((responseFromApi) => {
        const sortProducts = responseFromApi.data.sort((o1, o2) => new Date(o2.updatedAt) - new Date(o1.updatedAt));
        this.setState({
          listOfProducts: sortProducts
        });
      })
      .catch((err) => console.log("Error while fetching products", err));
  };

  removeProduct = (product) => {
    if (product) {
      deleteProduct(product._id)
      .then(() =>{
        this.getAllProducts();
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  };

  searchFilter = (e) => {
    this.setState({ search: e.target.value });
    axios
      .get(`${process.env.REACT_APP_APIURL || ""}/api/products`)
      .then((responseFromApi) => {
        const sortProducts = responseFromApi.data.filter((product) =>
          product.name.toLowerCase().includes(this.state.search.toLowerCase())
        );
        this.setState({
          listOfProducts: sortProducts,
        });
      })
      .catch((err) => console.log("Error while fetching products", err));
  };
  
  componentDidMount() {
    this.getAllProducts();
    this.removeProduct();
  }

  render() {
    return (
      <>
        {this.props.userInSession ? (
          <>
            {this.props.userInSession.type === 'restaurant' ? (
              <div className="container restaurant-products">
                <div className="buttons d-flex align-items-center justify-content-between">
                  <Link to={"/profile/restaurant"}>
                    <img src="/arrow-black-left.png" alt="" style={{width: '32px', height: '32px'}}></img>
                  </Link>
                  <Link to={"/products/new"}>
                    <button className="btn btn-orange">Ajouter un produit</button>
                  </Link>
                </div>
                <input
                    type="text"
                    className="form-control my-4"
                    placeholder="Chercher un produit"
                    value={this.state.search}
                    onChange={this.searchFilter}
                  />
                  <ResponsiveMasonry
                      columnsCountBreakPoints={{350: 1, 1024: 2, 1100: 3}}
                  >
                      <Masonry>
                  {this.state.listOfProducts.map((product) => {
                    return (
                        <div className="card container py-4 mb-4" key={product._id}>
                          <div className="top d-flex align-items-center">
                            <img className="product-img" src={product.photo} alt={product.name}/>
                            <div className="infos ml-3">
                              <h6>{product.name}</h6>
                              <p>{product.price}€</p>
                              {product.portion > 1 ? (
                                <p>Pour {product.portion} personnes</p>
                              ) : (
                                <p>Pour {product.portion} personne</p>
                              )}
                              <p>{product.calories} kcal</p>
                            </div>
                          </div>
                          <div className="bottom mt-3">
                            <p>{product.description}</p>
                          </div>
                          <div className="buttons d-flex align-items-end justify-content-between">
                            <Link to={`/products/edit/${product._id}`}>
                              <button className="btn btn-orange" product={this.product}>Modifier</button>
                            </Link>
                            <img
                              src="../dustbin.svg"
                              alt=""
                              onClick={(e) => {
                                this.props.userInSession
                                  ? this.removeProduct(product)
                                  : this.props.history.push("/login");
                              }}
                            ></img>
                          </div>
                        </div>
                      );
                    })}
                      </Masonry>
                  </ResponsiveMasonry>
              </div>  
            ) : (
              <NoAccess />
            )}
          </>
        ) : (
          <Login />
        )}
      </>
    )
  }
}

export default Products;