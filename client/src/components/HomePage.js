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
  };

  getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_APIURL || ""}/api/products`)
      .then((responseFromApi) => {
        this.setState({
          listOfProducts: responseFromApi.data,
        });
      })
      .catch((err) => console.log("Error while fetching products", err));
  };

  addToBasket = (e, product_id) => {
    if (product_id) {
      productById(product_id).then((product) => {
        this.props.updateBasket({ ...product, quantity: 1 });
      });
    }
  };

  componentDidMount() {
    this.getAllProducts();
    this.addToBasket();
  }

  sortByType = (e) => {
    axios
      .get(`${process.env.REACT_APP_APIURL || ""}/api/products`)
      .then((responseFromApi) => {
        const sortProducts = responseFromApi.data.filter(
          (product) => product.type === e.target.id
        );
        this.setState({
          listOfProducts: sortProducts,
        });
      })
      .catch((err) => console.log("Error while fetching products", err));
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

  render() {
    return (
      <div id="home">
        <div className="hero container">
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
            IronResto c'est nouveau et c'est déjà un sacré succès !
            C'est un immense food market au look arty signé Starck, le fameux groupe de restauration spécialisé dans la cuisine italienne à base de bons produits de la botte.
            Sous une halle à la grande verrière, on trouve plusieurs espaces de restauration qui proposent principalement de la cuisine italienne : pasta, pizzas, panna cotta, tiramisu...
            </p>
          </div>
        </div>
        <div className="buttons container">
          <button onClick={this.getAllProducts} className="my-3 mr-3">
            🍽&nbsp;&nbsp;La&nbsp;carte
          </button>
          <button onClick={this.sortByType} id="entree" className="my-3 mr-3">
            🥗&nbsp;&nbsp;Entrées
          </button>
          <button onClick={this.sortByType} id="plat" className="my-3 mr-3">
            🍝&nbsp;&nbsp;Plats
          </button>
          <button onClick={this.sortByType} id="dessert" className="my-3 mr-3">
            🍰&nbsp;&nbsp;Desserts
          </button>
          <button onClick={this.sortByType} id="boisson" className="my-3 mr-3">
            🍹&nbsp;&nbsp;Boissons
          </button>
        </div>

        <Swiper
          spaceBetween={32}
          slidesPerView= "auto"
          pagination={{ clickable: true }}
          className="container"
        >
          {this.state.listOfProducts.map((product) => {
            return (
              <SwiperSlide className="swiper-card" key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <img src={product.photo} alt="" className="d-flex justify-content-center" />
                </Link>
                <div className="infos">
                  <h6 className="mt-3">{product.name}</h6>
                </div>
                <div className="d-flex align-items-end justify-content-between">
                  <p className="mb-0">{product.price}€</p>
                  <button
                    type="submit"
                    className="btn btn-orange"
                    onClick={(e) => this.addToBasket(e, product._id)}
                    style={{ height: "fit-content" }}
                  >
                    Ajouter
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }
}

export default HomePage;
