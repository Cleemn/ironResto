import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

import { productById } from "./services/product-service";

SwiperCore.use([Navigation, Pagination]);

class HomePage extends React.Component {
  state = {
    listOfProducts: [],
    search: "",
    isMobile: window.innerWidth < 768,
  };

  getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((responseFromApi) => {
        this.setState({
          listOfProducts: responseFromApi.data,
        });
      })
      .catch((err) => console.log("Error while fetching products", err));
  };

  addToBasket = (e, product_id) => {
    if (product_id) {
      productById(product_id)
        .then(product => {
          this.props.updateBasket({ ...product, quantity: 1 })
        });
    }
  };

  componentDidMount() {
    this.getAllProducts();
    this.addToBasket();
  }

  sortByType = (e) => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(responseFromApi => {
        const sortProducts = responseFromApi.data.filter(product => product.type === e.target.id);
        this.setState({
          listOfProducts: sortProducts,
        });
      })
      .catch((err) => console.log("Error while fetching products", err));
  };

  searchFilter = (e) => {

    this.setState({search: e.target.value});
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(responseFromApi => {
        const sortProducts = responseFromApi.data.filter(product => product.name.toLowerCase().includes(this.state.search.toLowerCase()));
        this.setState({
          listOfProducts: sortProducts,
        });
      })
      .catch((err) => console.log("Error while fetching products", err));
  };

  render() {
    const isMobile = this.state.isMobile;

    return (
      <div id="home">
        <div className="hero">
          <div className="left">
            <h1>Bienvenue chez IronResto</h1>
            <p>Vous avez faim ? Ca tombe bien !</p>
            <input
              type="text"
              className="form-control"
              placeholder="Je trouve mon diner 😋"
              value={this.state.search}
              onChange={this.searchFilter}
            />
          </div>
          <div className="right">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
              labore facere aperiam? Autem pariatur illum maiores cumque
              consequuntur. Nihil laborum rerum illo dolore cupiditate et
              placeat minima consectetur blanditiis accusantium!
            </p>
          </div>
        </div>
        <div className="buttons container">
          <button onClick={this.getAllProducts} className="my-3 mx-2">
            🍽&nbsp;&nbsp;La&nbsp;carte
          </button>
          <button onClick={this.sortByType} id="entree" className="my-3 mx-2">
            🥗&nbsp;&nbsp;Entrées
          </button>
          <button onClick={this.sortByType} id="plat" className="my-3 mx-2">
            🍝&nbsp;&nbsp;Plats
          </button>
          <button onClick={this.sortByType} id="dessert" className="my-3 mx-2">
            🍰&nbsp;&nbsp;Desserts
          </button>
          <button onClick={this.sortByType} id="boisson" className="my-3 mx-2">
            🍹&nbsp;&nbsp;Boissons
          </button>
        </div>

        {isMobile ? (
          <Swiper
            spaceBetween={32}
            slidesPerView={1.3}
            pagination={{ clickable: true }}
          >
            {this.state.listOfProducts.map((product) => {
              return (
                <SwiperSlide className="swiper-card" key={product._id}>
                  <Link to={`/products/${product._id}`}>
                    <img src={product.photo} alt="" />
                  </Link>
                  <h5>{product.name}</h5>
                  <p>{product.price}€</p>
                  <button
                    type="submit"
                    className="btn btn-orange btn-block"
                    onClick={(e) => this.addToBasket(e, product._id)}
                  >
                    Ajouter au panier
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="products">
            {this.state.listOfProducts.map((product) => {
              return (
                <div className="card" key={product._id}>
                  <Link to={`/products/${product._id}`}>
                    <img src={product.photo} alt="" />
                  </Link>
                  <h5>{product.name}</h5>
                  <p>{product.price}€</p>
                  <button
                    type="submit"
                    className="btn btn-orange btn-block"
                    onClick={(e) => this.addToBasket(e, product._id)}
                  >
                    Ajouter au panier
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;
