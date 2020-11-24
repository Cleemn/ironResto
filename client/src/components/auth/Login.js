import React from 'react';
import { login } from './auth-service';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = { 
    username: '',
    password: ''
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    login(username, password)
      .then(response => {
        this.setState({username: "", password: ""});
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
          <h3>Login</h3>

          <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" name="email" id="email" value={this.state.email} onChange={e => this.handleChange(e)} />
          </div>

          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" name="password" id="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          </div>

          <button type="submit" className="btn btn-orange btn-block">Submit</button>
        </form>
      </div>
    )
  }
}

export default Login;