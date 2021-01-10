import React from "react";
import { signup, handleUpload } from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
    photo: "",
    type: "user",
    errorMessage: "",
    preview: ''
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const password = this.state.password;
    const phone = this.state.phone;
    const email = this.state.email;
    const type = this.state.type;
    const photo = this.state.photo;

    signup(firstName, lastName, password, email, phone, photo, type)
      .then((response) => {
        this.props.history.push(`/verification/${this.state.email}`)
        this.setState({
          firstName: "",
          lastName: "",
          password: "",
          phone: "",
          email: "",
          photo: "",
          type: "user",
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    if (this.state.preview) {
      this.handleChange();
    }
  }

  render() {
    return (
      <div className="auth container text-center">
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              id="firstName"
              value={this.state.firstName}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label>Nom de famille</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              id="lastName"
              value={this.state.lastName}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label>Numéro de téléphone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label>Adresse email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={this.state.email}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
              className="form-control"
            />
          </div>

          <div className="form-group">
              {this.state.preview ? (
                <img src={this.state.preview} alt=""/>
              ) : (
              <div>
                <label htmlFor="photo">Choisir une photo</label>
                <input type="file" id="photo" className="inputfile" onChange={e => this.handleFileUpload(e)} />
              </div>
              )}
            </div>

          <button type="submit" className="btn btn-orange">
            Je créé mon compte
          </button>
          <div className="forgot-password text-right">
            <small>
              J'ai déjà un compte !
              <Link to="/login">
                <br/>Se connecter
              </Link>
            </small>
          </div>

          {this.state.errorMessage && (
            <div className="error-message">
              <p>{this.state.errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Signup;
