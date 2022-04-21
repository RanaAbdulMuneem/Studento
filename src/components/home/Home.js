import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div>
            <h1>This is the Home page</h1>
            <Link to="/jobs">Go to jobs</Link>
        </div>
    )
}