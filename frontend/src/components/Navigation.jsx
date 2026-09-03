import { Link } from "react-router-dom"

function Navigation() {
    return (
        <nav>
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/post">Posts</Link>
        </nav>
    )
}

export default Navigation