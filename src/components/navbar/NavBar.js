import { Link } from "react-router-dom";
import {Container, Navbar, Nav} from "react-bootstrap"
const NavBar = () => {
    return  <Navbar bg="dark" variant="dark" id="navbar">
    <Container>
    <Navbar.Brand as={Link} to="/"><i>Studento</i></Navbar.Brand>
    <Nav className="">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/studentsignup">Sign up</Nav.Link>
      <Nav.Link as={Link} to="/studentlogin">Log in</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
}

export default NavBar;