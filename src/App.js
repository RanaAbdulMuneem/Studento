import "./App.css";
import { Button, Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateJob from "./components/createjob/CreateJob";
import NavBar from "./components/navbar/NavBar";
import StudentProfile from "./components/StudentProfile/StudentProfile";
import Footer from "./components/footer/Footer";

import StudentSignup from "./components/StudentSignup/StudentSignup";
import StudentLogin from "./components/StudentLogin/StudentLogin";

import { Jobs } from "./components/jobs/Jobs";
import { Home } from "./components/home/Home";
import CompanySignup from "./components/CompanySignup/CompanySignup";
import CompanyLogin from "./components/CompanyLogin/CompanyLogin";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div class="container-lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/createjob" element={<CreateJob />}></Route>
          <Route path="/studentprofile" element={<StudentProfile />}></Route>
          <Route path="/studentsignup" element={<StudentSignup />}></Route>
          <Route path="/studentlogin" element={<StudentLogin />}></Route>
          <Route path="/companysignup" element={<CompanySignup />}></Route>
          <Route
            path="/companylogin"
            element={<CompanyLogin></CompanyLogin>}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
