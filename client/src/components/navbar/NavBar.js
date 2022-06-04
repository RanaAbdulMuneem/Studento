import { Link, useNavigate } from "react-router-dom";
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap"
import { Component, useEffect, useState } from "react";

import StudentoLogo from '../../images/studento_logo.png'

export const NavBar = (props) => {
  const [user, setUser] = useState(undefined);
  const data = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setUser(data);
  })

  const handleLogout = () => {
		localStorage.removeItem('token')
    localStorage.removeItem('type')
    //------------------------------
    localStorage.removeItem('user');
    //------------------------------
		navigate('/');
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
          alt="not supported"
          />
          {' '}
          Studento
          </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {
            localStorage.getItem("type") !== 'company' &&
            <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
          }
        </Nav>
        <Nav>
          {
            user == undefined ? (
              <>
                <Nav.Link as={Link} to="/studentsignup"  className="end-link">Student Portal</Nav.Link>
                <Nav.Link as={Link} to="/companysignup" className="end-link">Company Portal</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                as={Link}
                to={
                  "/" + localStorage.getItem("type") + "profile"
                }
                className="end-link"
                >
                  Profile
                </Nav.Link>
                <Nav.Link className="end-link" onClick={handleLogout}>Logout</Nav.Link>
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