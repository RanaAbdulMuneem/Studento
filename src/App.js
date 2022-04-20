
import './App.css';
import {Button, Navbar} from "react-bootstrap"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateJob from "./components/createjob/CreateJob"
import NavBar from "./components/navbar/NavBar"
import StudentProfile from "./components/StudentProfile/StudentProfile"
import Footer from "./components/footer/Footer"

function App() {
  return <BrowserRouter>
  <NavBar/>
    <Routes>
      <Route path="/createjob" element={<CreateJob />}></Route>
      <Route path="/studentprofile" element={<StudentProfile />}></Route>
      
    </Routes>
    <Footer/>
  </BrowserRouter>

}

export default App;
