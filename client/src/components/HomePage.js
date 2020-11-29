import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

class HomePage extends React.Component {
  state = { listOfProducts: [] }

  getAllProducts = () =>{
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(responseFromApi => {
        this.setState({
          listOfProducts: responseFromApi.data
        })
      })
      .catch(err => console.log('Error while fetching products', err))
  }

  componentDidMount() {
    this.getAllProducts();
  }

  sortByType = (e) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(responseFromApi => {
        const sortProducts = responseFromApi.data.filter(product => product.type === e.target.id);
        this.setState({
          listOfProducts: sortProducts
        })
      })
      .catch(err => console.log('Error while fetching products', err))
  }

  render(){
    return(
      <div className="container">
        <h1>Bienvenue chez IronResto</h1>
        <p>Vous avez faim ? Ca tombe bien !</p>
        <form action="">
          <input type="text" placeholder="Chercher un produit"/>
        </form>
        <button onClick={this.getAllProducts}>Voir tous les produits</button>
        <button onClick={this.sortByType} id="entree">Entrées</button>
        <button onClick={this.sortByType} id="plat">Plats</button>
        <button onClick={this.sortByType} id="dessert">Desserts</button>
        <button onClick={this.sortByType} id="boisson">Boissons</button>
        <Swiper
          spaceBetween={56}
          slidesPerView={1.3}
        >
          {this.state.listOfProducts.map( product => {
            return (
              <SwiperSlide className="swiper-card" key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <img src={product.photo} alt=""/>
                </Link>
                <h5>{product.name}</h5>
                <p>{product.price}€</p>
                <button type="submit" className="btn btn-orange btn-block">Ajouter au panier</button>
              </SwiperSlide>
            )})
          }
        </Swiper>
      </div>
    )
  }
}

export default HomePage;