import "./App.css";

import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import StudentoLogo from "./images/studento_logo.png";

import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateJob from "./components/createjob/CreateJob";
import StudentProfile from "./components/StudentProfile/StudentProfile";
import CompanyProfile from "./components/companyprofile/CompanyProfile";
import Footer from "./components/footer/Footer";

import StudentSignup from "./components/StudentSignup/StudentSignup";
import StudentLogin from "./components/StudentLogin/StudentLogin";

import { Job } from "./components/job/Job";
import { Jobs } from "./components/jobs/Jobs";
import { Home } from "./components/home/Home";
import CompanySignup from "./components/CompanySignup/CompanySignup";
import CompanyLogin from "./components/CompanyLogin/CompanyLogin";
import NavBar from "./components/navbar/NavBar";
import ViewStudentProfile from "./components/StudentProfile/ViewStudentProfile";
import ViewCompanyProfile from "./components/companyprofile/ViewCompanyProfile";

import PasswordReset from "./components/password-reset/PasswordRest";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div class="App container-lg mt-3 pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<Job />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/createjob" element={<CreateJob />}></Route>

          <Route path="/studentprofile" element={<StudentProfile />}></Route>
          <Route path="/students/:id" element={<ViewStudentProfile />}></Route>

          <Route path="/companyprofile" element={<CompanyProfile />}></Route>
          <Route path="/companies/:id" element={<ViewCompanyProfile />}></Route>

          <Route path="/studentsignup" element={<StudentSignup />}></Route>
          <Route path="/studentlogin" element={<StudentLogin />}></Route>
          <Route path="/companysignup" element={<CompanySignup />}></Route>
          <Route
            path="/companylogin"
            element={<CompanyLogin></CompanyLogin>}
          ></Route>

          <Route
            path="/passwordReset/:email/:token"
            element={<PasswordReset></PasswordReset>}
          ></Route>
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
