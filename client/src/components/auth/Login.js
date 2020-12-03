import React from 'react';
import { login } from './auth-service';
import { Link } from 'react-router-dom';
// import { Redirect } from "react-router";

class Login extends React.Component {
  state = { 
    username: '',
    password: '',
    email: '',
    errorMessage:''
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;

    login(username, password, email)
      .then(response => {
        this.setState({username: "", password: "", email: ""});
        this.props.updateUser(response)        
        if(response.type === "user"){


          this.props.history.push('/profile/user')
        }
        else if(response.type === "restaurant"){
          this.props.history.push('/profile/restaurant')
        }
      })
      .catch( error => {
        this.setState({errorMessage:error.response.data.message})
      })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div className="auth container">
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
              <label>Adresse email</label>
              <input type="email" className="form-control" placeholder="Enter email" name="email" id="email" value={this.state.email} onChange={e => this.handleChange(e)} />
          </div>

          <div className="form-group">
              <label>Pseudo</label>
              <input type="text" className="form-control" placeholder="Enter username" name="username" id="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          </div>

          <div className="form-group">
              <label>Mot de passe</label>
              <input type="password" className="form-control" placeholder="Enter password" name="password" id="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          </div>

          <button type="submit" className="btn btn-orange btn-block">Je me connecte</button>
          <div className="forgot-password text-right">
            <p>
              Vous n'avez pas encore de compte ?
              <Link to="/signup">
                Créer un compte
              </Link>
            </p>
          </div>
          { this.state.errorMessage && (
            <div className="message">
            <p>{this.state.errorMessage}</p>
          </div>
          )}
          
        </form>
      </div>
    )
  }
}

export default Login;