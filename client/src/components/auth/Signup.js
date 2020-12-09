import React from "react";
import { signup } from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    phone: "",
    type: "user",
    errorMessage: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const phone = this.state.phone;
    const email = this.state.email;
    const type = this.state.type;

    signup(username, password, email, phone, type)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
          phone: "",
          email: "",
          type: "user",
        });
        this.props.updateUser(response);
        if (response.type === "user") {
          this.props.history.push("/profile/user");
        } else if (response.type === "restaurant") {
          this.props.history.push("/profile/restaurant");
        }
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
        <form onSubmit={this.handleFormSubmit}>
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
            <label>Pseudo</label>
            <input
              type="text"
              className="form-control"
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
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={(e) => this.handleChange(e)}
            />
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
            <div className="message">
              <p>{this.state.errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Signup;
