import React from 'react';
import {signup} from './auth-service';
import { Link } from 'react-router-dom';


class Signup extends React.Component {
  state = { 
    username: '',
    passwordHash: '',
    email: '',
    phone: ''
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const passwordHash = this.state.passwordHash;
    const phone = this.state.phone;
    const email = this.state.email;

    signup(username, passwordHash, phone, email)
      .then(response => {
        this.setState({username: "", passwordHash: "", phone: "", email: ""});
        this.props.updateUser(response)
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div>
        <img src="logo.png" alt=""/>
        <form>
          <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Entrez votre email" name="email" id="email" value={this.state.email} onChange={e => this.handleChange(e)}/>
          </div>

          <div className="form-group">
              <label>Password</label>
              <input type="text" name="password" placeholder="Entrez votre mot de passe" id="password" value={this.state.password} onChange={e => this.handleChange(e)} className="form-control"/>
          </div>
          
          <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" placeholder="Entrez votre username" name="username" id="username" value={this.state.username} onChange={e => this.handleChange(e)}/>
          </div>

          <div className="form-group">
              <label>Phone</label>
              <input type="tel" className="form-control" placeholder="Entrez votre téléphone" name="phone" id="phone" value={this.state.phone} onChange={e => this.handleChange(e)}/>
          </div>
          <button type="submit" className="btn btn-orange btn-block">Sign Up</button>
          <p className="forgot-password text-right">
            <p>
              Already registered ? 
              <Link to="/login">
                Login
              </Link>
            </p>
          </p>

        </form>
      </div>
    )
  }
}

export default Signup;