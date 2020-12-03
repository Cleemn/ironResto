import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./auth/auth-service";
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

class AppNavbar extends React.Component {
  state = {
    redirect: false,
  };

  logoutHandler = (e) => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          {this.props.userInSession ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item basket-icon">
                <Link className="nav-link basket-icon" to="/user/order">
                  <img src="shopping-basket-white-black.svg" alt=""></img>
                  <span>{this.props.basket.length}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Homepage
                </Link>
              </li>
              <li className="nav-item">
                <img src="logo.png" alt="" />
              </li>
              <li className="nav-item">
                Welcome, {this.props.userInSession.username}
              </li>
              <li className="nav-item">
                <button
                  onClick={(e) => {
                    logout()
                      .then(() => {
                        this.props.updateUser(null);
                        this.props.history.push("/");
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item basket-icon">
                <Link className="nav-link basket-icon" to="/user/order">
                  <img src="shopping-basket-white-black.svg" alt=""></img>
                  <span>{this.props.basket.length}</span>{" "}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Homepage
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default AppNavbar;
