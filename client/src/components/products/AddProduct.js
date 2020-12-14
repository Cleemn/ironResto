import React, {Component} from 'react';
import { createProduct } from "../services/product-service";

class AddProduct extends Component{
  state = {
    name: '',
    price: 0,
    description: '',
    type: '',
    portion: 0,
    calories: 0,
    errorMessage: ""
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const price = this.state.price;
    const description = this.state.description;
    const type = this.state.type;
    const portion = this.state.portion;
    const calories = this.state.calories;

    createProduct(name, price, description, type, portion, calories)
      .then((response) => {
        this.setState({
          name: "",
          price: "",
          description: "",
          type: "",
          portion: "",
          calories: ""
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render(){
    return(
      <div className="add-product container text-center">
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
            <input
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

          <button type="submit" className="btn btn-orange">
            Je créé mon compte
          </button>

          {this.state.errorMessage && (
            <div className="message">
              <p>{this.state.errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    )
  }
}

export default AddProduct