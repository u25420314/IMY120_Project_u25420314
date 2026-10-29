import { NavLink, useNavigate} from "react-router-dom"
import Logo from "./Logo"
import { getUser, clearUser } from "../session"

function Navigation() {

    const navigate = useNavigate()
    const user = getUser()

    const handleLogout = () => {
        clearUser()
        navigate("/")
    }

    return (
        <header className="site-header">
            
            <Logo to="/home"/>
            {user && (
                <>
                    
                    <nav className="site-nav" aria-label="Main navigation">
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
                    </nav>
                    <button type="button" onClick={handleLogout}>Log out</button>
                </>
            )}
        </header>
        
    )
}

export default Navigation