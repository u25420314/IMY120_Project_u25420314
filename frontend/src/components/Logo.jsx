import { Link } from "react-router-dom"


function Logo({ size = "small", to }){
    const content = (
        <span className={`logo logo-${size}`}>
            <span className="logo-text">
                <span className="logo-name">FLICK</span>
                <span className="logo-tagline">Make your life a movie</span>
            </span>
            <img className="logo-icon" src="/favicon.svg" alt=""/>
        </span>
    )

    if(to){
        return <Link to={to} className="logo-link" aria-label="Flick home">{content}</Link>
    }

    return content
}

export default Logo