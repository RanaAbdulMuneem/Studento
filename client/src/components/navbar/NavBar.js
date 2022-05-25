import './Navbar.css'

import { Link } from "react-router-dom";
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap"
import { Component } from "react";

import StudentoLogo from '../../images/studento_logo.png'

export const NavBar = (props) => {
  
  const loginStudent = () => {
    props.user = "student"
  }
  const loginCompany = () => {
    props.user = "company"
  }
  const logout = () => {
    props.user = "none"
  }
  
  
  return  (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
          src={StudentoLogo}
          class="img-fluid"
          width="40"
          />
          {' '}
          Studento
          </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
        </Nav>
        <Nav>
          {
            props.user == "none" ? (
              <>
                <Nav.Link as={Link} to="/studentsignup" onClick={loginStudent}>Student Portal</Nav.Link>
                <Nav.Link as={Link} to="/companysignup" onClick={loginCompany}>Company Portal</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to={"/" + props.user + "profile"}>Profile</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>
              </>
            )
          }
        </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar;