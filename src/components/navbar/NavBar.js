
import {Container, Navbar, Nav} from "react-bootstrap"
const NavBar = () => {
    return  <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home"><i>Studento</i></Navbar.Brand>
    <Nav className="">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Sign up</Nav.Link>
      <Nav.Link href="#pricing">Log in</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
}

export default NavBar;