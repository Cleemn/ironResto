import React, {Component} from 'react';
import { productById, editProduct, handleUpload } from "../services/product-service";
import StyledContentLoader from 'styled-content-loader';
import { Link } from "react-router-dom";

class EditProduct extends Component{
  state = {
    name: '',
    price: 0,
    description: '',
    type: '',
    portion: 0,
    calories: 0,
    photo: '',
    preview: '',
    errorMessage: ""
  }

  getProduct() {
    productById(this.props.match.params.id)
    .then(p => {
      this.setState({name: p.name, price: p.price, description: p.description, type: p.type, portion: p.portion, calories: p.calories, photo: p.photo, preview: p.photo})
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const price = this.state.price;
    const description = this.state.description;
    const type = this.state.type;
    const portion = this.state.portion;
    const calories = this.state.calories;
    const photo = this.state.photo;
    
    editProduct(this.props.match.params.id, {name, price, description, type, portion, calories, photo})
      .then((response) => {
        this.setState(this.state);
        this.props.history.push('/products');
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append('photo', e.target.files[0]);
 
    handleUpload(uploadData)
      .then(response => {
        this.setState({ photo: response.secure_url, preview: URL.createObjectURL(e.target.files[0]) });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });
  };
  
  componentDidMount() {
    this.getProduct();
  }

  render(){
    return(
      <div className="container">
        {this.props.userInSession ? (
          <div>
            <Link to={"/products"}>
              <img src="/arrow-black-left.png" alt="" style={{width: '32px', height: '32px'}}></img>
            </Link>
            <div className="add-product text-center">
              <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <label>Nom du produit</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="description"
                    id="description"
                    value={this.state.description}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label>Prix</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    id="price"
                    value={this.state.price}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label>Type</label>
                  <select
                    type="text"
                    className="form-control"
                    name="type"
                    id="type"
                    value={this.state.type}
                    onChange={(e) => this.handleChange(e)}
                    style={{background: '#F6F5F4', borderColor: 'white'}}
                  >
                    <option value="">Type de produit</option>
                    <option value="entree">Entrée</option>
                    <option value="plat">Plat</option>
                    <option value="dessert">Dessert</option>
                    <option value="boisson">Boisson</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>Portion</label>
                  <input
                    type="number"
                    name="portion"
                    id="portion"
                    value={this.state.portion}
                    onChange={(e) => this.handleChange(e)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Calories</label>
                  <input
                    type="number"
                    name="calories"
                    id="calories"
                    value={this.state.calories}
                    onChange={(e) => this.handleChange(e)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <img src={this.state.preview} alt=""/>
                  <label htmlFor="photo">Choisir une photo</label>
                  <input type="file" id="photo" className="inputfile" onChange={e => this.handleFileUpload(e)} />
                </div>


                <button type="submit" className="btn btn-orange">
                  Enregistrer les modifications
                </button>

                {this.state.errorMessage && (
                  <div className="message">
                    <p>{this.state.errorMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        ) : (
          <StyledContentLoader>
          </StyledContentLoader>
        )}
      </div>
    )
  }
}

export default EditProduct;