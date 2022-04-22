import "./App.css";

import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap"
import StudentoLogo from './images/studento_logo.png'

//import NavBar from './components/navbar/'

import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateJob from "./components/createjob/CreateJob";
import StudentProfile from "./components/StudentProfile/StudentProfile";
import Footer from "./components/footer/Footer";

import StudentSignup from "./components/StudentSignup/StudentSignup";
import StudentLogin from "./components/StudentLogin/StudentLogin";

import { Job } from './components/job/Job'
import { Jobs } from './components/jobs/Jobs';
import { Home } from './components/home/Home';
import CompanySignup from "./components/CompanySignup/CompanySignup";
import CompanyLogin from "./components/CompanyLogin/CompanyLogin";


function App() {
  const [user, setUser] = useState("none")

  const loginStudent = () => {
    setUser("student")
  }
  const loginCompany = () => {
    setUser("company")
  }
  const logout = () => {
    setUser("none")
  }

  const NavBar = () => {
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
              user == "none" ? (
                <>
                  <Nav.Link as={Link} to="/studentsignup" onClick={loginStudent}>Student Portal</Nav.Link>
                  <Nav.Link as={Link} to="/companysignup" onClick={loginCompany}>Company Portal</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                  as={Link}
                  to={
                    "/" + user + "profile"
                  }
                  >
                    Profile
                  </Nav.Link>
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

  return (
    <BrowserRouter>
      <NavBar/>

        <div class="App container-lg mt-3 pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/job/:id" element={<Job />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/createjob" element={<CreateJob />}></Route>
            <Route path="/studentprofile" element={<StudentProfile />}></Route>
            <Route path="/studentsignup" element={<StudentSignup />}></Route>
            <Route path="/studentlogin" element={<StudentLogin />}></Route>
            <Route path="/companysignup" element={<CompanySignup />}></Route>
            <Route path="/companylogin" element={<CompanyLogin></CompanyLogin>}></Route>
          </Routes>
        </div>

        <Footer/>
      </BrowserRouter>
  )
}

export default App;
