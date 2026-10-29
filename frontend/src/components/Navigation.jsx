import { Link, useNavigate} from "react-router-dom"
import { getUser, clearUser } from "../session"

function Navigation() {

    const navigate = useNavigate()
    const user = getUser()

    const handleLogout = () => {
        clearUser()
        navigate("/")
    }

    return (
        <nav>
            <Link to="/home">FLICK</Link>
            <Link to="/home">Home</Link>
            {user && <Link to={`/profile/${user._id}`}>Profile</Link>}
            {user && <button type="button" onClick={handleLogout}>Log out</button>}
        </nav>
    )
}

export default Navigation