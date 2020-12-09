import React from "react";
import { edit } from "../auth/auth-service";

import StyledContentLoader from 'styled-content-loader';

class EditUser extends React.Component {
  state = {
    firstName: this.props.userInSession.firstName,
    lastName: this.props.userInSession.lastName,
    email: this.props.userInSession.email,
    password: this.props.userInSession.password,
    phone: this.props.userInSession.phone,
    errorMessage: ""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const password = this.state.password;
    const phone = this.state.phone;

    console.log("before update user in session", this.props.userInSession)
    
    edit(firstName, lastName, email, password, phone)
      .then((response) => {
        console.log("response", response);

        this.props.updateUser(response);
        console.log("user in session", this.props.userInSession)
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
      <div className="auth container text-center">
        {this.props.userInSession ? (
          <div>
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
                  <button type="submit" className="btn btn-orange my-3">Enregistrer les modifications</button>

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