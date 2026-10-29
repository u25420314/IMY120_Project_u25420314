import { useState } from "react"
import { Navigate } from "react-router-dom"
import Logo from "../components/Logo"
import SignupForm  from "../components/SignupForm"
import LoginForm from "../components/LoginForm"
import { getUser } from "../session"

function SplashPage(){
    const [view, setView] = useState("intro")


    if(getUser()){
        return <Navigate to="/home" replace/>
    }

    if(view === "intro"){
        return(
            <main className="splash">
                <div className="splash-hero">
                    <Logo size="large"/>
                    <button type="button" className="btn-big" onClick={() => setView("login")}>GET STARTED</button>
                </div>
            </main>
        )
    }
    return(
        <main>
            <Logo/>

            {view === "login"
                ? <LoginForm onSwitchtoSignup={() => setView("signup")}/>
                : <SignupForm onSwitchLogin={() => setView("login")}/>
            }
        </main>
    )
}

export default SplashPage