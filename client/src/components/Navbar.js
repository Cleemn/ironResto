import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from './auth/auth-service'

const Navbar = (props) => {
  return (
    <nav className="nav-style">
      {props.userInSession ? (
        <ul>
          <li>Welcome, {props.userInSession.username}</li>
          <li>
            <Link to='/' style={{textDecoration: 'none'}}>Homepage</Link>
          </li>
          <li>
            <button onClick={(e) => {
              logout().then(() => props.updateUser(null))
            }}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to='/signup' style={{textDecoration: 'none'}}>Signup</Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar;
