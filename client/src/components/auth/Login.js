import React from 'react';
import { login } from './auth-service';
import { Link } from 'react-router-dom';
// import { Redirect } from "react-router";

class Login extends React.Component {
  state = { 
    password: '',
    email: '',
    errorMessage:''
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const password = this.state.password;
    const email = this.state.email;

    login(password, email)
      .then(response => {
        this.setState({password: "", email: ""});
        this.props.updateUser(response)        
        if(response.type === "user"){


          this.props.history.push('/profile/user')
        }
        else if(response.type === "restaurant"){
          this.props.history.push('/profile/restaurant')
        }
      })
      .catch( error => {
        this.setState({errorMessage:error})
      })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div className="auth container text-center">
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
              <label>Adresse email</label>
              <input type="email" className="form-control" name="email" id="email" value={this.state.email} onChange={e => this.handleChange(e)} />
          </div>

          <div className="form-group">
              <label>Mot de passe</label>
              <input type="password" className="form-control" name="password" id="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          </div>

          <button type="submit" className="btn btn-orange">Je me connecte</button>
          <div className="forgot-password text-right">
            <small>
              Vous n'avez pas encore de compte ?
              <Link to="/signup">
                <br/>Créer un compte
              </Link>
            </small>
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