import React from 'react';
import { signup } from './auth-service';
import { Link } from 'react-router-dom';


class Signup extends React.Component {
  state = { 
    username: '',
    password: '',
    email: '',
    phone: '',
    type: 'user'
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const phone = this.state.phone;
    const email = this.state.email;
    const type = this.state.type;

    signup(username, password, email, phone, type)
      .then(response => {
        this.setState({username: "", password: "", phone: "", email: "", type: "user"});
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
      <div className="auth">
        <img src="logo.png" alt=""/>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Entrez votre email" name="email" id="email" value={this.state.email} onChange={e => this.handleChange(e)}/>
          </div>

          <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Entrez votre mot de passe" id="password" value={this.state.password} onChange={e => this.handleChange(e)} className="form-control"/>
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