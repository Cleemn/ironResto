import React from "react";
import { edit } from "../auth/auth-service";

import StyledContentLoader from 'styled-content-loader';

class EditUser extends React.Component {
  state = {
    username: this.props.userInSession.username,
    password: this.props.userInSession.password,
    email: this.props.userInSession.email,
    phone: this.props.userInSession.phone,
    errorMessage: ""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const phone = this.state.phone;
    const email = this.state.email;

    edit(username, password, email, phone)
      .then((response) => {
        console.log(response);
        this.setState({
          username: "",
          password: "",
          phone: "",
          email: ""
        });
        this.props.updateUser(response);
        this.props.history.push("/profile/user");
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="auth container">
        {this.props.userInSession ? (
          <div>
                <form onSubmit={this.handleFormSubmit}>
                  <div className="form-group">
                    <label>Adresse email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Entrez votre email"
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
                      placeholder="Entrez votre mot de passe"
                      id="password"
                      value={this.state.password}
                      onChange={(e) => this.handleChange(e)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Pseudo</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Entrez votre username"
                      name="username"
                      id="username"
                      value={this.state.username}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Numéro de téléphone</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Entrez votre téléphone"
                      name="phone"
                      id="phone"
                      value={this.state.phone}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <button type="submit" className="btn btn-orange btn-block">Enregistrer les modifications</button>

                  {this.state.errorMessage && (
                    <div className="message">
                      <p>{this.state.errorMessage}</p>
                    </div>
                  )}
                </form>
              </div>
        ) : (
          <StyledContentLoader>
          </StyledContentLoader>
        )}
      </div>
    );
  }
}

export default EditUser;