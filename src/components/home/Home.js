import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div>
            <h1>This is the Home page</h1>
            <Link to="/jobs">Go to jobs</Link>
            <br />
            <Link to="/createjob">Create Job</Link>
            <br />
            <Link to="/studentprofile">Student Profile</Link>
            <br />
            <Link to="/studentsignup">Student Signup</Link>
            <br />
            <Link to="/studentlogin">Student Login</Link>
            <br />
        </div>
    )
}