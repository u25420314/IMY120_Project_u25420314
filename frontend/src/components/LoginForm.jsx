import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { saveUser } from "../session"

function LoginForm({ onLoginSuccess, onSwitchtoSignup }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
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
        setLoading(true)

        try{
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password})

                
            })

            const data = await response.json()
            console.log("Login response:", data)

            if(!response.ok){
                throw new Error(data.error || data.message || "Failed to login")
            }

            saveUser(data)

            if(onLoginSuccess){
                onLoginSuccess(data)
            }

            navigate("/home")
        }catch(e){
            console.error("Login request failed:", e)
            setError(e.message || "Something went wrong, please try again")
        }finally{
            setLoading(false)
        }
    }

    return(
        <section className="auth-card">
            <h2>LOGIN</h2>

            <form onSubmit={handleSubmit}>
                {error && <p role="alert">{error}</p>}

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                    />
                </div>

                <button type="submit" disabled={loading}>{loading ? "LOGGING IN..." : "LOGIN"}</button>
            </form>

            <div className="auth-switch">
                <p>Need an account?</p>
                <button type="button" onClick={onSwitchtoSignup}>SIGN UP</button>
            </div>
        </section>
        
    )
}
export default LoginForm