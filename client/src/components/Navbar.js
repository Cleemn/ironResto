import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from './auth/auth-service';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse">
        {props.userInSession ? (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <img src="logo.png" alt=""/>
          </li>
          <li className="nav-item">
            Welcome, {props.userInSession.username}
          </li>
          <li className="nav-item">
            <button onClick={(e) => {
              logout().then(() => props.updateUser(null))
            }}>Logout</button>
          </li>
        </ul>
        ) : (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to='/'>Homepage</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/signup'>Signup</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/login'>Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/products'>Produits</Link>
          </li>
        </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
