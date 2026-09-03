import { useState } from "react"
import SignupForm  from "../components/SignupForm"
import LoginForm from "../components/LoginForm"

function SplashPage(){
    const [showLogin, setShowLogin] = useState(false) // shows signup by degfault

    return(
        <main>
            {showLogin ? <LoginForm onSwitch={() => setShowLogin(false)}/>
                : <SignupForm onSwitch={() => setShowLogin(true)}/>
            }
        </main>
    )
}

export default SplashPage