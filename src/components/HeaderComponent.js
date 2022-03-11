import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Jumbotron,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Jumbotron fluid>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1>NuCamp</h1>
                <h2>a better way to camp</h2>
              </div>

              <div className="col text-right">
                <h3>Student:</h3>
                <h5>Rudy Gutierrez</h5>
              </div>
            </div>
          </div>
        </Jumbotron>

        <Navbar dark sticky="top" expand="md">
          <div className="container">
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="/assets/images/logo.png"
                alt="NuCamp Logo"
                width="30"
                height="30"
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>

                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <i className="fa fa-home fa-lg" /> Home
                  </NavLink>
                </NavItem>

               <NavItem>
                 <NavLink className='nav-link' to='/directory'>
                   <i className="fa fa-list fa-lg"></i> Directory
                 </NavLink>
               </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <i className="fa fa-info fa-lg"></i> About 
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <i className="fa fa-address-card fa-lg"></i> Contact Us!
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;