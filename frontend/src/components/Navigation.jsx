import { Link } from "react-router-dom"

function Navigation() {
    return (
        <nav>
            <Link to="/home">Home</Link>
            <Link to="/profile/1">Profile</Link>
            <Link to="/post/1">Posts</Link>
        </nav>
    )
}

export default Navigation