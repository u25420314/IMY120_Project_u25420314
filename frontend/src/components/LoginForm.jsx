import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onSwitch }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()

        //validation
        if(!email || !password){
            setError("All fields are required!")
            return
        }

        if(!email.includes("@")){
            setError("Please enter a valid email!")
        }

        setError("")

        try{
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password})

                
            })

            const data = await response.json()
            console.log("Login response:", data)

            navigate("/home")
        }catch(e){
            console.error("Login request failed:", e)
            setError("Something went wrong, please try again")
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            {error && <p role="alert">{error}</p> }


            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your email address"
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter your password"
            />

            <button type="submit">Sign up</button>

            <p>Don't have an account? {" "}<button type="button" onClick={onSwitch}>Sign Up</button></p>
            
            
        </form>
    )
}
export default LoginForm