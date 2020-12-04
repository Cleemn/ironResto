import React from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "./auth/auth-service";
import { Navbar, Nav, Button } from "react-bootstrap";


class AppNavbar extends React.Component {
  state = {
    redirect: false,
  };

  logoutHandler = (e) => {
    this.props.history.push("/login");
  };

  closeNavbar = () => {
    const nav = document.querySelector('.navbar-collapse');
    nav.classList.remove('show');
  }

  render() {

    return (
        <Navbar expand="lg" sticky="top" bg="white">
          <Navbar.Brand as={Link} to="/">
            <img 
            className="d-inline-block align-top logo"
            src="/logo.png"
            alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {this.props.userInSession ? (
            <Nav className="mr-auto">
              <Nav.Link eventKey="disabled" disabled>
                <em>Bonjour, {this.props.userInSession.username} !</em>
              </Nav.Link>
              
              <Nav.Link as={NavLink} to="/" onClick={this.closeNavbar}>La carte</Nav.Link>
              <Nav.Link as={NavLink} to="/profile/user" onClick={this.closeNavbar}>Mes commandes</Nav.Link>
              <Nav.Link as={NavLink} to="/edit" onClick={this.closeNavbar}>Modifier mon profil</Nav.Link>
              <Button
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
                </Button>
            </Nav>
              ) : (
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/" onClick={this.closeNavbar}>La carte</Nav.Link>
              <Nav.Link as={NavLink} to="/login" onClick={this.closeNavbar}>Se connecter</Nav.Link>
              <Nav.Link as={NavLink} to="/signup" onClick={this.closeNavbar}>Créer un compte</Nav.Link>
            </Nav>
              )}
          </Navbar.Collapse>
        </Navbar>
      // <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //   <div className="collapse navbar-collapse">
      //     {this.props.userInSession ? (
      //       <ul className="navbar-nav mr-auto">
      //         <li className="nav-item basket-icon">
                // <Link className="nav-link basket-icon" to="/user/order">
                //   <img src="shopping-basket-white-black.svg" alt=""></img>
                //   <span>{this.props.basket.length}</span>
                // </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/">
      //             Homepage
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           Welcome, {this.props.userInSession.username}
      //         </li>
      //         <li className="nav-item" onClick={(e)=>{alert("coucou")}}>
      //         </li>
      //       </ul>
      //     ) : (
      //       <ul className="navbar-nav mr-auto">
      //         <li className="nav-item basket-icon">
      //           <Link className="nav-link basket-icon" to="/user/order">
      //             <img src="shopping-basket-white-black.svg" alt=""></img>
      //             <span>{this.props.basket.length}</span>{" "}
      //           </Link>
      //         </li>

      //         <li className="nav-item">
      //           <Link className="nav-link" to="/">
      //             Homepage
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/signup">
      //             Signup
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/login">
      //             Login
      //           </Link>
      //         </li>
      //       </ul>
      //     )}
      //   </div>
      // </nav>
    );
  }
}

export default AppNavbar;